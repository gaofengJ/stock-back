import CurdTradeCalDao from '@/dao/trade-cal';

import { getTradeCal } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { log } from 'console';

export default class CurdTradeCalService {
  /**
   * 交易日历单条导入
   * @param params { calDate: string, isOpen: number, preTradeDate: string }
   * @returns id
   */
  static async create(
    params: {
      calDate: string,
      isOpen: number,
      preTradeDate: string
    },
  ): Promise<string> {
    const res: string = await CurdTradeCalDao.create(params);
    return res;
  }

  /**
   * 交易日历批量导入
   * @param year 年
   * @returns 导入数量
   */
  static async bulkCreate(year: string): Promise<number | null> {
    const { code, data } = await getTradeCal(year);
    if (code) return null;
    let { fields } = data;
    const { items } = data;
    fields = ['exchange', 'calDate', 'isOpen', 'preTradeDate']; // tushare接口返回字段对不上，所以写死了
    const params = mixinFieldAndItem(fields, items);
    const res: number = await CurdTradeCalDao.bulkCreate(params);

    log(`导入交易日历：成功导入${year}年${res}条数据`);
    return res;
  }

  /**
   * 清空交易日历
   * @returns number
   */
  static async truncateDestroy(): Promise<string> {
    const res: number = await CurdTradeCalDao.truncateDestroy();
    const str = !res ? '清空交易日历：成功' : '清空交易日历：失败';
    log(str);
    return str;
  }

  /**
   * 获取时间段内的所有交易日
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns string[]
   */
  static async getList(startDate: string, endDate: string): Promise<string[]> {
    const res: string[] = await CurdTradeCalDao.getList(startDate, endDate);
    return res;
  }

  /**
   * 查询日期是否为交易日
   * @param date 日期
   * @returns isOpen 0：否 1：是
   */
  static async getIsOpen(date: string): Promise<boolean> {
    const res: number = await CurdTradeCalDao.getIsOpen(date);
    return !!res;
  }

  /**
   * 查询上一个交易日
   * @param date 日期
   */
  static async getPrevDate(date: string): Promise<string> {
    const res: string = await CurdTradeCalDao.getPrevDate(date);
    return res;
  }
}
