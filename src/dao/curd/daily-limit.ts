import TDailyLimit from '@/models/t.daily-limit';
import { Op } from 'sequelize';

export default class CurdDailyLimitDao {
  /**
   * 每日涨跌停价格批量导入
   * @param <{ id: string, tradeDate: string, tsCode: string, upLimit: float, downLimit: float }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: {
      id: string,
      tradeDate: string,
      tsCode: string,
      upLimit: number,
      downLimit: number
    }[],
  ): Promise<number> {
    const res = await TDailyLimit.bulkCreate(params);
    return (res || []).length;
  }

  /**
   * 删除每日涨跌停价格
   * @returns number
   */
  static async destroy(date: string): Promise<number> {
    const res: number = await TDailyLimit.destroy({
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
    });
    return res;
  }
}
