import CurdDailyDao from '@/dao/daily';

export default class AnalysisNumService {
  /**
   * @description 查询上涨、下跌、平盘数据
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param fields 字段
   * @returns Record<string, any>[]
   */
  static async getNum(
    startDate: string,
    endDate: string,
  ): Promise<Record<string, any>[]> {
    const resUp: Record<string, any>[] = await CurdDailyDao.getNum(
      startDate,
      endDate,
      'up',
    );
    const resDown: Record<string, any>[] = await CurdDailyDao.getNum(
      startDate,
      endDate,
      'down',
    );
    const resZero: Record<string, any>[] = await CurdDailyDao.getNum(
      startDate,
      endDate,
      'zero',
    );
    const res: Record<string, any>[] = resUp.map(((_, index: number) => ({
      tradeDate: resUp[index]?.tradeDate,
      up: resUp[index]?.up,
      down: resDown[index]?.down,
      zero: resZero[index]?.zero,
    })));
    return res;
  }
}
