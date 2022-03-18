import {
  JsonController,
  Get,
  QueryParam,
  BadRequestError,
} from 'routing-controllers';
import { getType, dateFormat } from 'mufeng-tools';
import AnalysisNumService from '@/services/analysis/num';

@JsonController('/analysis/num')
export default class AnalysisNumController {
  @Get('/')
  async getRiseNum(
    @QueryParam('startDate') startDate: string,
    @QueryParam('endDate') endDate: string,
    @QueryParam('fields', { type: 'string' }) fields: string | string[],
  ) {
    // eslint-disable-next-line no-param-reassign
    startDate = dateFormat(new Date(startDate), 'yyyyMMdd');
    // eslint-disable-next-line no-param-reassign
    endDate = dateFormat(new Date(endDate), 'yyyyMMdd');
    // eslint-disable-next-line no-param-reassign
    fields = getType(fields) === 'string' ? [fields as string] : fields;
    if ((fields as string[])?.some((i: any) => !['up', 'down', 'zero'].includes(i))) {
      throw new BadRequestError('fields参数错误');
    }
    // eslint-disable-next-line no-param-reassign
    const list = await AnalysisNumService.getNum(
      startDate, endDate, fields as string[],
    );
    return {
      total: list.length,
      list,
    };
  }
}
