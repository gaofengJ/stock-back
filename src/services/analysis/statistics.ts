import AnalysisStatisticsDao from '@/dao/analysis/statistics';

export default class AnalysisStatisticsService {
  static getStatistics(date: string) {
    return AnalysisStatisticsDao.getStatistics(date);
  }
}
