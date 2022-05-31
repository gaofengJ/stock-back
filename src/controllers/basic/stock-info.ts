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
  @QueryParam('stock') stock: string,
  @QueryParam('industry') industry: string,
  @QueryParam('area') area: string,
  @QueryParam('market') market: string,
  @QueryParam('isSubNew') isSubNew: number,
  @QueryParam('isHs') isHs: number,
  ): Promise<{
    total: number,
    list: Record<string, any>[]
  }> {
    const params: Record<string, string | number> = {
      pageNum,
      pageSize,
      stock, // 股票代码｜股票名称 ｜ 股票全称
      industry, // 行业
      area, // 所在区域
      market, // 交易所
      isSubNew, // 是否为次新 0 fasle, 1: true
      isHs, // 是否为沪深港通 0 fasle, 1: true
    };
    const res: {
      total: number,
      list: Record<string, any>[]
    } = await BasicStockInfoService.getStocks(params);
    return res;
  }
}
