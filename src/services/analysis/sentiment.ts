import AnalysisSentimentDao from '@/dao/analysis/sentiment';

export default class AnalysisSentimentService {
  static async getSentiment(startDate: string, endDate: string, fields: string[]) {
    const res: Array<Record<string, any>> = await AnalysisSentimentDao.getSentiment(
      startDate, endDate, fields,
    );
    return res;
  }
}
