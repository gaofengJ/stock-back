import {
  JsonController,
  Get,
  QueryParam,
  // BadRequestError,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import LimitConnectService from '@/services/limit/connect';

@JsonController('/limit')
export default class LimitConnectController {
  /**
   * 查询连板数据
   * @param date 日期
   */
  @Get('/connects')
  async getConnects(
    @QueryParam('startDate', { required: true }) startDate: string,
    @QueryParam('endDate', { required: true }) endDate: string,
    @QueryParam('num', { required: true }) num: number,
  ): Promise<Base.listRes> {
    // eslint-disable-next-line no-param-reassign
    startDate = dateFormat(new Date(startDate), 'yyyyMMdd');
    // eslint-disable-next-line no-param-reassign
    endDate = dateFormat(new Date(endDate), 'yyyyMMdd');
    const list: Record<string, any>[] = await LimitConnectService.getConnects(
      startDate,
      endDate,
      num,
    );
    return {
      total: list.length,
      list,
    };
  }
}
