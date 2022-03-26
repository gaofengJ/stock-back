import AnalysisNumDao from '@/dao/analysis/num';

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
    fields: string[],
  ): Promise<Record<string, any>[]> {
    const res: Record<string, any>[] = await AnalysisNumDao.getNum(
      startDate,
      endDate,
      fields,
    );
    return res;
  }
}
