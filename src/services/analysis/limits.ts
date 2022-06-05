import CurdLimitListDao from '@/dao/limit-list';

export default class AnalysisLimitService {
  /**
   * @description 查询涨停家数、跌停家数
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns Record<string, any>[]
   */
  static async getLimits(
    startDate: string,
    endDate: string,
  ): Promise<Record<string, any>[]> {
    const resU: Record<string, any>[] = await CurdLimitListDao.getLimits(
      startDate,
      endDate,
      'U',
    );
    const resD: Record<string, any>[] = await CurdLimitListDao.getLimits(
      startDate,
      endDate,
      'D',
    );
    const res: Record<string, any>[] = resU.map(((itemU: Record<string, any>, i: number) => ({
      tradeDate: resU[i]?.tradeDate,
      up: resU[i]?.count,
      down: resD.find(
        (itemD: Record<string, any>) => (itemD.tradeDate === itemU.tradeDate),
      )?.count || 0,
    })));
    return res;
  }
}
