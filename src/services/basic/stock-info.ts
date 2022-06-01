import CurdStockBasicDao from '@/dao/stock-basic';
import CurdTradeCalDao from '@/dao/trade-cal';
import { dateFormat } from 'mufeng-tools';

export default class CurdStockBasicService {
  static async getStocks(params: Record<string, string | number>): Promise<{
    total: number,
    list: Record<string, any>[]
  }> {
    const todayStr: string = dateFormat(new Date(), 'yyyyMMdd');
    const isOpen: number = await CurdTradeCalDao.getIsOpen(todayStr);
    const prevTradeDate: string = await CurdTradeCalDao.getPrevDate(todayStr);
    const tradeDate: string = (!isOpen || new Date().getHours() < 18) ? prevTradeDate : todayStr;
    const res: {
      total: number,
      list: Record<string, any>[]
    } = await CurdStockBasicDao.getStocks(params, tradeDate);
    return res;
  }
}
