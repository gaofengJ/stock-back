import TDaily from '@/models/t.daily';
import { Op } from 'sequelize';

export default class CurdDailyDao {
  /**
   * 每日交易数据批量导入
   * @param <{ id: string, tsCode: string, name: string, tradeDate: string, open: number,
   * high: number, low: number, close: number, preClose: number, change: number,
   * pctChg: number, vol: number, amount: number, }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: {
      id: string,
      tsCode: string,
      name: string,
      tradeDate: string,
      open: number,
      high: number,
      low: number,
      close: number,
      preClose: number,
      change: number,
      pctChg: number,
      vol: number,
      amount: number,
    }[],
  ): Promise<number> {
    const res = await TDaily.bulkCreate(params);
    return (res || []).length;
  }

  /**
   * 删除每日交易数据
   * @returns number
   */
  static async destroy(date: string): Promise<number> {
    const res: number = await TDaily.destroy({
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
    });
    return res;
  }
}
