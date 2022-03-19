import AnalysisSentimentDao from '@/dao/analysis/sentiment';

export default class AnalysisSentimentService {
  /**
   * @description 查询短线情绪指标
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param fields 字段
   * @returns Array<Record<string, any>>
   */
  static async getSentiment(startDate: string, endDate: string, fields: string[]) {
    const res: Array<Record<string, any>> = await AnalysisSentimentDao.getSentiment(
      startDate, endDate, fields,
    );
    return res;
  }
}
