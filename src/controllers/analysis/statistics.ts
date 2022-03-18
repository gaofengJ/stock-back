import {
  JsonController,
  Get,
  QueryParam,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import AnalysisStatisticsService from '@/services/analysis/statistics';

@JsonController('/analysis/statistics')
export default class AnalysisStatisticsController {
  @Get('/')
  async getStatistics(
    @QueryParam('date') date: string,
  ) {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(date, 'yyyyMMdd');
    const list = await AnalysisStatisticsService.getStatistics(date);
    return {
      total: list.length,
      list,
    };
  }
}
