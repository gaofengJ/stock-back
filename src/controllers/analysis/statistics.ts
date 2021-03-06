import {
  JsonController,
  Get,
  QueryParam,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import AnalysisStatisticsService from '@/services/analysis/statistics';

@JsonController('/analysis/statistics')
export default class AnalysisStatisticsController {
  /**
   * @description 查询涨跌统计
   * @param date 日期
   * @returns { total, list }
   */
  @Get('/')
  async getStatistics(
    @QueryParam('date', { required: true }) date: string,
  ): Promise<Base.listRes> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(date, 'yyyyMMdd');
    const list: Record<string, any>[] = await AnalysisStatisticsService.getStatistics(date);
    return {
      total: list.length,
      list,
    };
  }
}
