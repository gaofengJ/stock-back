import TMarketMood from '@/models/t.market-mood';

export default class CurdMarketMoodDao {
  /**
   * 情绪指标单条导入
   * @param params { date: string, a: number, b: number, c: number, d: number, e: number,
   * sentimentA: number, sentimentB: number, sentimentC: number, sentimentD: number,
   * @returns id
   */
  static async create(
    params: {
      id: string,
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
}
