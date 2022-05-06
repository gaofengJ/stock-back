import { v4 as uuidv4 } from 'uuid';

import { log } from 'console';
import CurdMarketMoodDao from '@/dao/curd/market-mood';

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
    const res: string = await CurdMarketMoodDao.create({
      id: uuidv4(),
      ...params,
    });
    log(`导入每日情绪指标：成功导入${params.tradeDate}数据`);
    return res;
  }
}
