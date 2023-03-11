import CurdMarketMoodDao from '@/dao/market-mood';

export default class CurdMarketMoodService {
  /**
   * 情绪指标单条导入
   * @param params { date: string, a: number, b: number, c: number, d: number, e: number,
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
    if (!params.a || !params.b || !params.c || !params.d || !params.e
      || !params.sentimentA || !params.sentimentB || !params.sentimentC || !params.sentimentD) {
      console.info(`导入每日情绪指标：${params.tradeDate}数据导入失败`);
      return `导入每日情绪指标：${params.tradeDate}数据导入失败`;
    }
    const ret: string = await CurdMarketMoodDao.create(params);
    console.info(`导入每日情绪指标：成功导入${params.tradeDate}数据`);
    return ret;
  }

  /**
   * 删除每日情绪指标
   * @returns number
   */
  static async destroy(date: string): Promise<string> {
    const ret: number = await CurdMarketMoodDao.destroy(date);
    const str: string = `删除每日情绪指标：成功删除${date}共${ret}条数据`;
    console.info(str);
    return str;
  }
}
