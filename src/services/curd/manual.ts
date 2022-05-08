import { dateFormat, dateGetBeforeDay } from 'mufeng-tools';
import { log } from 'console';
import CurdTradeCalService from './trade-cal';
import CurdStockBasicService from './stock-basic';
import CurdDailyService from './daily';
import CurdLimitListService from './limit-list';
import CurdMarketMoodService from './market-mood';

export default class CurdManualService {
  /**
   * 手动导入每日数据
   * @param date 交易日期
   * @returns string 成功提示
   */
  static async manualImport(date: string): Promise<string> {
    const isOpen: boolean = await CurdTradeCalService.getIsOpen(date);
    if (!isOpen) {
      throw new Error(`${date}不是交易日，请重新选择交易日期`);
    }
    await this.getTradeCal(date); // 每年的最后一个交易日（最后一个周五）导入下一年的交易日历
    await this.getStockBasic(date); // 每周一导入股票基本信息（导入新增股票）
    await this.getDaily(date); // 每日数据统计
    await this.getLimitList(date); // 每日涨跌停统计
    await this.getDailyMarketMood(date); // 每日短线情绪指标
    log(`${date}所有交易数据导入成功`);
    return `${date}所有交易数据导入成功`;
  }

  /**
   * 手动删除每日数据
   * @param date 交易日期
   * @returns string 成功提示
   */
  static async manualDestroy(date: string): Promise<string> {
    const isOpen: boolean = await CurdTradeCalService.getIsOpen(date);
    if (!isOpen) {
      throw new Error(`${date}不是交易日，请重新选择交易日期`);
    }
    await CurdDailyService.destroy(date); // 删除每日数据统计
    await CurdLimitListService.destroy(date); // 删除每日涨跌停统计
    await CurdMarketMoodService.destroy(date); // 删除每日情绪指标
    log(`${date}所有交易数据删除成功`);
    return `${date}所有交易数据删除成功`;
  }

  /**
   * 每年的最后一个交易日（最后一个周五）导入下一年的交易日历
   * @param date 日期
   */
  static async getTradeCal(date: string): Promise<void> {
    const curYear: number = new Date().getFullYear(); // 获取当前年份
    const lastDay: string = `${curYear}-12-31`; // 获取当年最后一天
    const lastDayIndex: number = new Date(lastDay).getDay(); // 获取当年最后一天是周几
    let lastTradeDay: string = ''; // 当年最后一个交易日
    if ([1, 2, 3, 4, 5].includes(lastDayIndex)) {
      lastTradeDay = dateFormat(lastDay, 'yyyyMMdd');
    } else {
      lastTradeDay = lastDayIndex === 6
        ? dateGetBeforeDay(lastDay, 'yyyyMMdd') as string
        : dateGetBeforeDay(dateGetBeforeDay(lastDay, 'yyyy-MM-dd') as string, 'yyyyMMdd') as string;
    }
    if (lastTradeDay !== date) return;
    await CurdTradeCalService.bulkCreate(`${curYear + 1}`);
  }

  /**
   * 每周一导入股票基本信息
   * @param date 日期
   */
  static async getStockBasic(date: string): Promise<void> {
    const pattern: RegExp = /(\d{4})(\d{2})(\d{2})/;
    const dateFormated: string = date.replace(pattern, '$1-$2-$3'); // 将yyyyMMdd转成yyyy-MM-dd
    const day: number = new Date(dateFormated).getDay();
    if (day !== 1) return;
    await CurdStockBasicService.truncateDestroy();
    await CurdStockBasicService.bulkCreate(['SSE', 'SZSE']);
  }

  /**
   * 导入当日交易数据
   * @param date 日期
   */
  static async getDaily(date: string): Promise<void> {
    await CurdDailyService.bulkCreate(date);
  }

  /**
   * 导入当日涨跌停数据
   * @param date 日期
   */
  static async getLimitList(date: string): Promise<void> {
    await CurdLimitListService.bulkCreate(date);
  }

  /**
   * 导入当日短线情绪指标
   * @param date 日期
   */
  static async getDailyMarketMood(date: string): Promise<void> {
    const prevTradeDate: string = await CurdTradeCalService.getPrevDate(date); // 查询上一个交易日

    const res: Record<string, number> = { // 短线情绪指标，以2022年01月05日为例
      a: 0, // 2022年01月05日涨停，非一字涨停，非ST
      b: 0, // 2022年01月04日涨停，非一字涨停，非ST
      c: 0, // 2022年01月04日涨停，非一字涨停，非ST，2022年201月05日高开
      d: 0, // 2022年01月04日涨停，非一字涨停，非ST，2022年201月05日上涨
      e: 0, // 2022年01月05日曾涨停，非ST
      sentimentA: 0, // 非一字涨停 sentimentA = a
      sentimentB: 0, // 打板高开率 sentimentB = c / b
      sentimentC: 0, // 打板成功率 sentimentC = d / b
      sentimentD: 0, // 打板被砸率 sentimentD = e / (a + e)
    };
    const curLimitData = await CurdLimitListService.getLimitU(date); // 获取当日涨停数据
    const curDailyData = await CurdDailyService.getDaily(date);
    const prevLimitData = await CurdLimitListService.getLimitU(prevTradeDate); // 查询上一日涨停数据
    res.a = curLimitData.filter((i) => (i.amp > 0.001)).length;
    res.b = prevLimitData.filter((i) => (i.amp > 0.001)).length;
    res.c = prevLimitData.filter((i) => {
      if (i.amp < 0.001) return false;
      const tempDailyData = curDailyData.find((j) => i.tsCode === j.tsCode);
      if (!tempDailyData) return false;
      return tempDailyData.open > tempDailyData.preClose;
    }).length;
    res.d = prevLimitData.filter((i) => {
      if (i.amp < 0.001) return false;
      const tempDailyData = curDailyData.find((j) => i.tsCode === j.tsCode);
      if (!tempDailyData) return false;
      return tempDailyData.pctChg > 0;
    }).length;
    res.e = curDailyData.filter((i) => i.high === i.upLimit
    && i.high !== i.close && !i.name.includes('ST')).length;
    res.sentimentA = res.a;
    res.sentimentB = Math.floor(res.c / res.b / 0.01);
    res.sentimentC = Math.floor(res.d / res.b / 0.01);
    res.sentimentD = Math.floor(res.e / (res.a + res.e) / 0.01);
    await CurdMarketMoodService.create({
      tradeDate: date,
      a: res.a,
      b: res.b,
      c: res.c,
      d: res.d,
      e: res.e,
      sentimentA: res.sentimentA,
      sentimentB: res.sentimentB,
      sentimentC: res.sentimentC,
      sentimentD: res.sentimentD,
    });
  }
}
