import TTradeCal from '@/models/t.trade-cal';
import { Op } from 'sequelize';

export default class CurdTradeCalDao {
  /**
   * 交易日历单条导入
   * @param params { calDate: string, isOpen: number, preTradeDate: string }
   * @returns id
   */
  static async create(
    params: {
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
    params: { calDate: string, isOpen: number, preTradeDate: string }[],
  ): Promise<number> {
    const ret = await TTradeCal.bulkCreate(params);
    return (ret || []).length;
  }

  /**
   * 清空交易日历
   * @returns number
   */
  static async truncateDestroy(): Promise<number> {
    const ret: number = await TTradeCal.destroy({
      truncate: true,
    });
    return ret;
  }

  /**
   * 获取时间段内的所有交易日
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns string[]
   */
  static async getList(startDate: string, endDate: string): Promise<string[]> {
    const list: Record<string, string>[] = await TTradeCal.findAll({
      attributes: ['calDate'],
      raw: true,
      where: {
        calDate: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        isOpen: {
          [Op.eq]: 1,
        },
      },
    });
    return list.map((item: Record<string, string>) => (item.calDate));
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

  /**
   * 查询上一个交易日
   * @param date 日期
   * @returns string
   */
  static async getPrevDate(date: string): Promise<string> {
    const tradeCal = await TTradeCal.findOne({
      attributes: ['preTradeDate'],
      where: {
        calDate: {
          [Op.eq]: date,
        },
      },
    });
    return tradeCal?.get('preTradeDate') as string;
  }

  /**
   * 查询区间内的所有交易日
   * @param startDate 开始日期
   * @param endDate 结束日期
   */
  static async getTradeDateByRange(
    startDate: string,
    endDate: string,
  ): Promise<string[]> {
    const dateList = await TTradeCal.findAll({
      attributes: ['calDate'],
      raw: true,
      where: {
        calDate: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        isOpen: {
          [Op.eq]: 1,
        },
      },
      order: [
        ['calDate', 'DESC'],
      ],
    });
    return dateList.map((i: Record<string, string>) => (i.calDate));
  }

  /**
   * 查询所选日期前的num个交易日（不包含当日）
   * @param date 日期
   * @param num 数量
   */
  static async getTradeDateByNum(
    date: string,
    num?: number,
  ): Promise<string[]> {
    const dateList = await TTradeCal.findAll({
      attributes: ['calDate'],
      raw: true,
      where: {
        calDate: {
          [Op.lt]: date,
        },
        isOpen: {
          [Op.eq]: 1,
        },
      },
      limit: num,
      order: [
        ['calDate', 'DESC'],
      ],
    });
    return dateList.map((i: Record<string, string>) => (i.calDate));
  }
}
