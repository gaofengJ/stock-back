import {
  JsonController,
  Get,
  QueryParam,
  // BadRequestError,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import AnalysisNumService from '@/services/analysis/num';

@JsonController('/analysis/num')
export default class AnalysisNumController {
  /**
   * @description 查询上涨、下跌、平盘数据
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns { total, list }
   */
  @Get('/')
  async getNum(
    @QueryParam('startDate', { required: true }) startDate: string,
    @QueryParam('endDate', { required: true }) endDate: string,
      // @QueryParam('fields', { required: true, type: 'string' }) fields: string | string[],
  ): Promise<Base.listRes> {
    // eslint-disable-next-line no-param-reassign
    startDate = dateFormat(new Date(startDate), 'yyyyMMdd');
    // eslint-disable-next-line no-param-reassign
    endDate = dateFormat(new Date(endDate), 'yyyyMMdd');
    // eslint-disable-next-line no-param-reassign
    // fields = getType(fields) === 'string' ? [fields as string] : fields;
    // if ((fields as string[])?.some((i: any) => !['up', 'down', 'zero'].includes(i))) {
    //   throw new BadRequestError('fields参数错误');
    // }
    // eslint-disable-next-line no-param-reassign
    const list: Record<string, any>[] = await AnalysisNumService.getNum(
      startDate,
      endDate,
      // fields as string[],
    );
    return {
      total: list.length,
      list,
    };
  }
}
