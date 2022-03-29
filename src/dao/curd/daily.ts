import TDaily from '@/models/t.daily';
import { Op } from 'sequelize';

export default class CurdDailyDao {
  /**
   * 每日交易数据批量导入
   * @param <{ id: string, tsCode: string, name: string, tradeDate: string, open: string,
   * high: string, low: string, close: string, preClose: string, change: string,
   * pctChg: string, vol: string, amount: string, }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: {
      id: string,
      tsCode: string,
      name: string,
      tradeDate: string,
      open: string,
      high: string,
      low: string,
      close: string,
      preClose: string,
      change: string,
      pctChg: string,
      vol: string,
      amount: string,
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
