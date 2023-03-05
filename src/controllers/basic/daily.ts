import {
  JsonController,
  Get,
  QueryParam,
} from 'routing-controllers';
import BasicDailyService from '@/services/basic/daily';
import { dateFormat } from 'mufeng-tools';

/**
 * 获取每日交易数据（分页）
 */
@JsonController('/basic/daily')
export default class BasicStockInfoController {
  @Get('/')
  async getDaily(
  @QueryParam('pageNum', { required: true }) pageNum: number,
  @QueryParam('pageSize', { required: true }) pageSize: number,
  @QueryParam('date', { required: true }) date: string,
  @QueryParam('stock') stock: string,
  ): Promise<{
    total: number,
    list: Record<string, any>[]
  }> {
    date = dateFormat(date, 'yyyyMMdd');
    const params: Record<string, string | number> = {
      pageNum,
      pageSize,
      date,
      stock, // 股票代码
    };
    const ret: {
      total: number,
      list: Record<string, any>[]
    } = await BasicDailyService.getDaily(params);
    return ret;
  }
}
