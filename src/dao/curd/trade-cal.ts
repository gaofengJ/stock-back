import TTradeCal from '@/models/t.trade-cal';
import { Op } from 'sequelize';

export default class CurdTradeCalDao {
  /**
   * 交易日历单条导入
   * @param params { id: string, calDate: string, isOpen: number, preTradeDate: string }
   * @returns id
   */
  static async create(
    params: {
      id: string,
      calDate: string,
      isOpen: number,
      preTradeDate: string,
    },
  ): Promise<string> {
    const tradeCal = await TTradeCal.create(params);
    return tradeCal.get('id') as string; // 返回id
  }

  /**
   * 交易日历批量导入
   * @param <{ id: string, calDate: string, isOpen: number, preTradeDate: string }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: { id: string, calDate: string, isOpen: number, preTradeDate: string }[],
  ): Promise<number> {
    const res = await TTradeCal.bulkCreate(params);
    return (res || []).length;
  }

  /**
   * 清空交易日历
   * @returns number
   */
  static async truncateDestroy(): Promise<number> {
    const res: number = await TTradeCal.destroy({
      truncate: true,
    });
    return res;
  }

  /**
   * 查询日期是否为交易日
   * @param date 日期
   * @returns isOpen 0：否 1：是
   */
  static async getIsOpen(date: string): Promise<number> {
    const tradeCal = await TTradeCal.findOne({
      attributes: ['isOpen'],
      where: {
        calDate: {
          [Op.eq]: date,
        },
      },
    });
    return tradeCal?.get('isOpen') as number;
  }
}
