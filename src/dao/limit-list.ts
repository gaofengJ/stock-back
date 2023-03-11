import TLimitList from '@/models/t.limit-list';
import { Op, Sequelize } from 'sequelize';

export default class CurdLimitListDao {
  /**
   * 每日涨跌停个股批量导入
   * @param params[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: {
      tsCode: string;
      tradeDate: string;
      name: string;
      industry: string;
      close: number;
      pctChg: number;
      amount: number;
      limitAmount: number;
      floatMv: number;
      totalMv: number;
      turnoverRatio: number;
      fdAmount: number;
      firstTime: string;
      lastTime: string;
      openTimes: number;
      upStat: string;
      limitTimes: number;
      limit: string;
    }[],
  ): Promise<number> {
    const ret = await TLimitList.bulkCreate(params);
    return (ret || []).length;
  }

  /**
   * 删除每日涨跌停个股
   * @param date 日期
   * @returns number
   */
  static async destroy(date: string): Promise<number> {
    const ret: number = await TLimitList.destroy({
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
    });
    return ret;
  }

  /**
   * 查询当日涨停数据
   * @param date 日期
   * @returns Record<string, any>[]
   */
  static async getLimit(date: string, fields?: string[]): Promise<Record<string, any>[]> {
    const ret: Record<string, any>[] = await TLimitList.findAll({
      attributes: fields || [
        'tradeDate',
        'tsCode',
        'name',
        'limit',
      ],
      raw: true,
      where: {
        tradeDate: {
          [Op.eq]: date,
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
    return ret;
  }

  /**
   * 查询多日涨跌停数量（附带count）
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param limitType 涨停（U）/跌停（D）
   */
  static async getLimits(
    startDate: string,
    endDate: string,
    limitType: string,
  ): Promise<Record<string, any>[]> {
    const ret: Record<string, any>[] = await TLimitList.findAll({
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
    return ret;
  }

  /**
   * 查询多日涨跌停数量
   * @param startDate 开始日期
   * @param endDate 结束日期
   */
  static async getConnects(
    startDate: string,
    endDate: string,
  ): Promise<Record<string, any>[]> {
    const ret: Record<string, any>[] = await TLimitList.findAll({
      attributes: [
        'tradeDate',
        'tsCode',
        'name',
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
          [Op.eq]: 'U',
        },
      },
      order: [
        ['tradeDate', 'DESC'],
      ],
    });
    return ret;
  }
}
