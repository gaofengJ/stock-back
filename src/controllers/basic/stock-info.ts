import {
  JsonController,
  Get,
  QueryParam,
} from 'routing-controllers';
import BasicStockInfoService from '@/services/basic/stock-info';

@JsonController('/basic/stocks')
export default class BasicStockInfoController {
  @Get('/')
  async getStocks(
  @QueryParam('pageNum', { required: true }) pageNum: number,
  @QueryParam('pageSize', { required: true }) pageSize: number,
  ): Promise<{
    total: number,
    list: Record<string, any>[]
  }> {
    const res: {
      total: number,
      list: Record<string, any>[]
    } = await BasicStockInfoService.getStocks(pageNum, pageSize);
    return res;
  }
}
