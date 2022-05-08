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
    const res: number = await TMarketMood.destroy({
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
    });
    return res;
  }
}
