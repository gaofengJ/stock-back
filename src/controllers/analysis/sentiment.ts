import {
  JsonController,
  Get,
  QueryParam,
  BadRequestError,
} from 'routing-controllers';
import { getType, dateFormat } from 'mufeng-tools';
import AnalysisSentimentService from '@/services/analysis/sentiment';

@JsonController('/analysis/sentiment')
export default class AnalysisSentimentController {
  /**
   * @description 查询短线情绪指标
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param fields 字段
   * @returns { total, list }
   */
  @Get('/')
  async getRiseSentiment(
    @QueryParam('startDate', { required: true }) startDate: string,
    @QueryParam('endDate', { required: true }) endDate: string,
    @QueryParam('fields', { type: 'string' }) fields: string | string[],
  ): Promise<Base.listRes> {
    startDate = dateFormat(new Date(startDate), 'yyyyMMdd');
    endDate = dateFormat(new Date(endDate), 'yyyyMMdd');
    fields = getType(fields) === 'string' ? [fields as string] : fields;
    if ((fields as string[])?.some((i: any) => !['a', 'b', 'c', 'd', 'e', 'sentimentA', 'sentimentB', 'sentimentC', 'sentimentD'].includes(i))) {
      throw new BadRequestError('fields参数错误');
    }
    const list: Record<string, any>[] = await AnalysisSentimentService.getSentiment(
      startDate,
      endDate,
      fields as string[],
    );
    return {
      total: list.length,
      list,
    };
  }
}
