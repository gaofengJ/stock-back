import TMarketMood from '@/models/t.market-mood';
import { Op } from 'sequelize';

export default class CurdMarketMoodDao {
  /**
   * 情绪指标单条导入
   * @param params { tradeDate: string, a: number, b: number, c: number, d: number, e: number,
   * sentimentA: number, sentimentB: number, sentimentC: number, sentimentD: number,
   * @returns id
   */
  static async create(
    params: {
      tradeDate: string,
      a: number,
      b: number,
      c: number,
      d: number,
      e: number,
      sentimentA: number,
      sentimentB: number,
      sentimentC: number,
      sentimentD: number,
    },
  ): Promise<string> {
    const MarketMood = await TMarketMood.create(params);
    return MarketMood.get('id') as string; // 返回id
  }

  /**
   * 删除每日情绪指标
   * @param date 日期
   * @returns number
   */
  static async destroy(date: string): Promise<number> {
    const ret: number = await TMarketMood.destroy({
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
    });
    return ret;
  }

  /**
   * @description 查询短线情绪数据
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param fields 字段
   * @returns 查询结果
   */
  static async getSentiment(
    startDate: string,
    endDate: string,
    fields: string[],
  ): Promise<Record<string, any>[]> {
    const ret: Record<string, any>[] = await TMarketMood.findAll({
      attributes: ['tradeDate'].concat(fields || ['a', 'b', 'c', 'd', 'e', 'sentimentA', 'sentimentB', 'sentimentC', 'sentimentD']),
      // 当raw的值为true时，这些方法对表进行查询操作后返回的值为从数据库中查询到的原始数据；
      // 当raw的值为false时（默认)，这些方法对表进行查询操作后返回的值为sequelize进行装饰过的数据
      raw: true,
      where: {
        tradeDate: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      order: [
        ['tradeDate', 'ASC'],
      ],
    });
    return ret;
  }
}
