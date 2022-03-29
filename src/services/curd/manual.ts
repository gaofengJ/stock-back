import { dateFormat, dateGetBeforeDay } from 'mufeng-tools';
import CurdTradeCalService from '@/services/curd/trade-cal';
import CurdStockBasicService from '@/services/curd/stock-basic';
import CurdDailyLimitService from './daily-limit';
// import { v4 as uuidv4 } from 'uuid';

// import { getTradeCal } from '@/api/tushare/index';
// import { mixinFieldAndItem } from '@/utils';
// import { log } from 'console';

export default class CurdManualService {
  /**
   * 手动导入每日数据
   * @param date 交易日期
   * @returns string 成功提示
   */
  static async manual(date: string): Promise<string> {
    const isOpen: boolean = await CurdTradeCalService.getIsOpen(date);
    if (!isOpen) {
      throw new Error(`${date}不是交易日，请重新选择交易日期`);
    }
    await this.getTradeCal(date); // 每年的最后一个交易日（最后一个周五）导入下一年的交易日历
    await this.getStockBasic(date); // 每周一导入股票基本信息（导入新增股票）
    await this.getDailyLimit(date); // 每日涨跌停价
    await this.getDaily(date); // 每日数据统计
    await this.getLimitList(date); // 每日涨跌停统计
    await this.getDailyMarketMood(date); // 每日短线情绪指标
    return `${date}所有交易数据导入成功`;
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

  static async getDailyLimit(date: string): Promise<void> {
    await CurdDailyLimitService.bulkCreate(date);
  }

  static async getDaily(date: string): Promise<void> {
    console.log(date);
  }

  static async getLimitList(date: string): Promise<void> {
    console.log(date);
  }

  static async getDailyMarketMood(date: string): Promise<void> {
    console.log(date);
  }
}
