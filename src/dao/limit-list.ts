import TLimitList from '@/models/t.limit-list';
import { Op, Sequelize } from 'sequelize';

export default class CurdLimitListDao {
  /**
   * 每日涨跌停个股批量导入
   * @param <{ tradeDate: string, tsCode: string, name: string, close: number,
   * pctChg: number, amp: number, fcRatio: number, flRatio: number, fdAmount: number,
   * firstTime: string, lastTime: string, openTimes: number, strth: number, limit: string, }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: {
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
   * @param date 日期
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

  /**
   * 查询当日涨停数据
   * @param date 日期
   * @returns Record<string, any>[]
   */
  static async getLimitU(date: string): Promise<Record<string, any>[]> {
    const res: Record<string, any>[] = await TLimitList.findAll({
      attributes: [
        'tradeDate',
        'tsCode',
        'name',
        'amp',
      ],
      raw: true,
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
        limit: {
          [Op.eq]: 'U',
        },
        name: {
          [Op.and]: [
            {
              [Op.notLike]: '%ST%',
            },
            {
              [Op.notLike]: '%N%',
            },
            {
              [Op.notLike]: '%C%',
            },
          ],
        },
      },
    });
    return res;
  }

  /**
   * 查询当日涨跌停数量
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param limitType 涨停（U）/跌停（D）
   */
  static async getLimits(
    startDate: string,
    endDate: string,
    limitType: string,
  ): Promise<Record<string, any>[]> {
    const res: Record<string, any>[] = await TLimitList.findAll({
      attributes: [
        'tradeDate',
        [Sequelize.fn('COUNT', Sequelize.col('limit')), 'count'],
      ],
      raw: true,
      where: {
        tradeDate: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        name: {
          [Op.and]: [
            {
              [Op.notLike]: '%ST%',
            },
            {
              [Op.notLike]: '%N%',
            },
            {
              [Op.notLike]: '%C%',
            },
          ],
        },
        limit: {
          [Op.eq]: limitType,
        },
      },
      group: 'tradeDate',
      order: [
        ['tradeDate', 'ASC'],
      ],
    });
    return res;
  }
}
