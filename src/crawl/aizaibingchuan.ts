import puppeteer, { Page } from 'puppeteer';
import config from './config';

// 基本配置
const targetUrl: string = 'https://weixin.sogou.com/';
const queryStr: string = '2020-7-21 爱在冰川复盘';

async function crawl(): Promise<any> {
  const ret: Record<string, any> = {
    title: '',
    date: '',
    content: '',
  };

  try {
    const browser = await puppeteer.launch(config);

    let page = await browser.newPage();

    await page.goto(targetUrl, {
      waitUntil: 'domcontentloaded',
    });

    await page.type('input[name=query]', queryStr);
    await page.keyboard.press('Enter'); // 输入内容搜索

    await page.waitForResponse('https://hhytrace.sogoucdn.com/p/'); // 等待接口响应

    // 在点击按钮之前，事先定义一个promise，用于返回新tab的page对象
    const pagePromise = new Promise(
      (ctx) => browser.once(
        'targetcreated',
        (target) => ctx(target.page()),
      ),
    );

    await (await page.$('.news-list>li:first-child h3 a'))?.click(); // 点击进入第一篇文章

    page = await pagePromise as Page;

    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    }); // 等待页面加载

    const article = await page.$('#js_article');

    ret.title = (await article?.$eval('#activity-name', (el) => el.innerHTML) as string); // 文章标题
    ret.date = ret.title.slice(ret.title.indexOf('（') + 1, ret.title.length - 8); // 日期
    ret.content = (await article?.$eval('#js_content', (el) => el.innerHTML.trim()) as string); // 文章内容

    console.info(ret);
  } catch (e) {
    console.info(e);
  }
}

crawl();
