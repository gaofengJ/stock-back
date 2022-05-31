import CurdStockBasicDao from '@/dao/stock-basic';

export default class CurdStockBasicService {
  static async getStocks(params: Record<string, string | number>): Promise<{
    total: number,
    list: Record<string, any>[]
  }> {
    const res: {
      total: number,
      list: Record<string, any>[]
    } = await CurdStockBasicDao.getStocks(params);
    return res;
  }
}
