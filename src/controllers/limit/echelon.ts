import {
  JsonController,
  Get,
  QueryParam,
  // BadRequestError,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import LimitEchelonService from '@/services/limit/echelon';

@JsonController('/limit/echelon')
export default class LimitEchelonController {
  /**
   * 查询连板梯队
   * @param date 日期
   */
  @Get('/')
  async getEchelon(
    @QueryParam('date', { required: true }) date: string,
  ): Promise<Base.listRes> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(new Date(date), 'yyyyMMdd');
    const list: Record<string, any>[] = await LimitEchelonService.getEchelon(
      date,
    );
    return {
      total: list.length,
      list,
    };
  }
}
