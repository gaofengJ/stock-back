import {
  JsonController,
  Get,
  QueryParam,
  // BadRequestError,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import AnalysisLimitService from '@/services/analysis/limits';

@JsonController('/analysis/limits')
export default class AnalysisLimitController {
  /**
   * @description 查询涨停家数、跌停家数
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns { total, list }
   */
  @Get('/')
  async getLimits(
    @QueryParam('startDate', { required: true }) startDate: string,
    @QueryParam('endDate', { required: true }) endDate: string,
      // @QueryParam('fields', { required: true, type: 'string' }) fields: string | string[],
  ): Promise<Base.listRes> {
    startDate = dateFormat(new Date(startDate), 'yyyyMMdd');
    endDate = dateFormat(new Date(endDate), 'yyyyMMdd');
    const list: Record<string, any>[] = await AnalysisLimitService.getLimits(
      startDate,
      endDate,
    );
    return {
      total: list.length,
      list,
    };
  }
}
