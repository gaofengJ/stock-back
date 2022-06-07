import {
  JsonController,
  Get,
  QueryParam,
  // BadRequestError,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import LimitReviewService from '@/services/limit/review';

@JsonController('/limit')
export default class LimitReviewController {
  /**
   * 查询涨停板复盘数据
   * @param date 日期
   */
  @Get('/review')
  async getReview(
    @QueryParam('date', { required: true }) date: string,
  ): Promise<Base.listRes> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(new Date(date), 'yyyyMMdd');
    const list: Record<string, any>[] = await LimitReviewService.getReview(
      date,
    );
    return {
      total: list.length,
      list,
    };
  }
}
