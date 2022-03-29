import TLimitList from '@/models/t.limit-list';
import { Op } from 'sequelize';

export default class CurdLimitListDao {
  /**
   * 每日涨跌停个股批量导入
   * @param <{ id: string, tradeDate: string, tsCode: string, name: string, close: number,
   * pctChg: number, amp: number, fcRatio: number, flRatio: number, fdAmount: number,
   * firstTime: string, lastTime: string, openTimes: number, strth: number, limit: string, }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: {
      id: string,
      tradeDate: string,
      tsCode: string,
      name: string,
      close: number,
      pctChg: number,
      amp: number,
      fcRatio: number,
      flRatio: number,
      fdAmount: number,
      firstTime: string,
      lastTime: string,
      openTimes: number,
      strth: number,
      limit: string,
    }[],
  ): Promise<number> {
    const res = await TLimitList.bulkCreate(params);
    return (res || []).length;
  }

  /**
   * 删除每日涨跌停个股
   * @returns number
   */
  static async destroy(date: string): Promise<number> {
    const res: number = await TLimitList.destroy({
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
    });
    return res;
  }
}
