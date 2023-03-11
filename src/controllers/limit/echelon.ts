import {
  JsonController,
  Get,
  QueryParam,
  // BadRequestError,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import LimitEchelonService from '@/services/limit/echelon';
import type { IList } from '@/types/base';

@JsonController('/limit')
export default class LimitEchelonController {
  /**
   * 查询连板梯队
   * @param date 日期
   */
  @Get('/echelon')
  async getEchelon(
    @QueryParam('date', { required: true }) date: string,
  ): Promise<IList<any>> {
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
