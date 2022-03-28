import TDailyLimit from '@/models/t.daily-limit';
import { Op } from 'sequelize';

export default class CurdDailyLimitDao {
  /**
   * 交易日历批量导入
   * @param <{ id: string, calDate: string, isOpen: number, preTradeDate: string }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: { id: string, calDate: string, isOpen: number, preTradeDate: string }[],
  ): Promise<number> {
    const res = await TDailyLimit.bulkCreate(params);
    return (res || []).length;
  }

  /**
   * 清空交易日历
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

  /**
   * 查询日期是否为交易日
   * @param date 日期
   * @returns isOpen 0：否 1：是
   */
  static async getIsOpen(date: string): Promise<number> {
    const dailyLimit = await TDailyLimit.findOne({
      attributes: ['isOpen'],
      where: {
        calDate: {
          [Op.eq]: date,
        },
      },
    });
    return dailyLimit?.get('isOpen') as number;
  }
}
