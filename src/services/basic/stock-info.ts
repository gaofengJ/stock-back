import CurdStockBasicDao from '@/dao/stock-basic';

export default class CurdStockBasicService {
  static async getStocks(pageNum: number, pageSize: number): Promise<{
    total: number,
    list: Record<string, any>[]
  }> {
    const res: {
      total: number,
      list: Record<string, any>[]
    } = await CurdStockBasicDao.getStocks(pageNum, pageSize);
    return res;
  }
}
