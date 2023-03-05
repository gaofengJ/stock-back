import puppeteer from 'puppeteer';
import { dateFormat, dateGetBeforeDay } from 'mufeng-tools';
import config from './config';

function timeout(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function clearInput(page: any, selector: any) {
  const inputValue = await page.$eval(selector, (input: any) => input.value);
  await page.focus(selector);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < inputValue.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await page.keyboard.press('Backspace');
  }
}

class MarketSentiment {
  targetUrl: string;

  date: string | Date;

  constructor(date: string) {
    this.targetUrl = 'http://www.iwencai.com/unifiedwap/home/index'; // 使用问财新地址
    this.date = date || new Date();
  }

  // 格式化时间 返回值示例：2020年1月1日
  getDate(val: string | Date) {
    const date = dateFormat(val);
    const dateArr = date.split('-');
    const dateStr = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`;
    return dateStr;
  }

  async crawl(date: string): Promise<any> {
    const ret = { // 短线情绪指标，以2020年7月7日为例
      a: 0, // 2020年7月7日涨停，非一字涨停，非ST
      b: 0, // 2020年7月6日涨停，非一字涨停，非ST
      c: 0, // 2020年7月6日涨停，非一字涨停，非ST，2020年7月7日高开
      d: 0, // 2020年7月6日涨停，非一字涨停，非ST，2020年7月7日上涨
      e: 0, // 2020年7月7日曾涨停，非ST
      sentimentA: 0, // 非一字涨停 sentimentA = a
      sentimentB: 0, // 打板高开率 sentimentB = c / b
      sentimentC: 0, // 打板成功率 sentimentC = d / b
      sentimentD: 0, // 打板被砸率 sentimentD = e / (a + e)
    };
    const browser = await puppeteer.launch(config);

    const currentDate = date || this.date;

    // 如果是周六或者周日返回异常
    if ((currentDate as Date).getDay() === 0 || (currentDate as Date).getDay() === 6) {
      return {
        code: -1,
        msg: '搜索日期不能为周六或周日',
      };
    }

    const currentDateFormat = this.getDate(currentDate);
    const beforeDateFormat = this.getDate(dateGetBeforeDay(currentDate));

    try {
      const page = await browser.newPage();

      await page.goto(this.targetUrl, {
        waitUntil: 'domcontentloaded',
      });

      await clearInput(page, 'textarea.search-input'); // 清空搜索框内容
      await timeout(3000);

      await page.type('textarea.search-input', `${currentDateFormat}涨停，非一字涨停，非ST`);
      await page.keyboard.press('Enter'); // 输入内容搜索
      await page.waitForSelector('.table-count strong'); // 等待元素加载
      ret.a = +await page.$eval('.table-count strong', (el) => el.innerHTML);

      await clearInput(page, 'textarea.search-input'); // 清空搜索框内容
      await timeout(3000);

      await page.type('textarea.search-input', `${beforeDateFormat}涨停，非一字涨停，非ST`);
      await page.keyboard.press('Enter'); // 输入内容搜索
      await timeout(3000); // 由于两次使用的是同一元素，所以等待3000ms
      ret.b = +await page.$eval('.table-count strong', (el) => el.innerHTML);

      await clearInput(page, 'textarea.search-input'); // 清空搜索框内容
      await timeout(3000);

      await page.type('textarea.search-input', `${beforeDateFormat}涨停，非一字涨停，非ST，${currentDateFormat}高开`);
      await page.keyboard.press('Enter'); // 输入内容搜索
      await timeout(3000);
      ret.c = +await page.$eval('.table-count strong', (el) => el.innerHTML);

      await clearInput(page, 'textarea.search-input'); // 清空搜索框内容
      await timeout(3000);

      await page.type('textarea.search-input', `${beforeDateFormat}涨停，非一字涨停，非ST，${currentDateFormat}上涨`);
      await page.keyboard.press('Enter'); // 输入内容搜索
      await timeout(3000);
      ret.d = +await page.$eval('.table-count strong', (el) => el.innerHTML);

      await clearInput(page, 'textarea.search-input'); // 清空搜索框内容
      await timeout(3000);

      await page.type('textarea.search-input', `${currentDateFormat}曾涨停，非ST`);
      await page.keyboard.press('Enter'); // 输入内容搜索
      await timeout(3000);
      ret.e = +await page.$eval('.table-count strong', (el) => el.innerHTML);

      await clearInput(page, 'textarea.search-input'); // 清空搜索框内容

      ret.sentimentA = ret.a; // a 非一字涨停
      ret.sentimentB = Math.floor(ret.c / ret.b / 0.01); // 打板高开率
      ret.sentimentC = Math.floor(ret.d / ret.b / 0.01); // 打板成功率
      ret.sentimentD = Math.floor(ret.e / (ret.a + ret.e) / 0.01); // 打板被砸率

      return ret;
    } catch (e) {
      return console.log('e', e);
    } finally {
      browser.close();
    }
  }
}

export default MarketSentiment;
