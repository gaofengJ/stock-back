import CurdDailyDao from '@/dao/daily';
import CurdTradeCalDao from '@/dao/trade-cal';
import { dateFormat } from 'mufeng-tools';

export default class BasicStockInfoService {
  static async getStocks(params: Record<string, string | number>): Promise<{
    total: number,
    list: Record<string, any>[]
  }> {
    const todayStr: string = dateFormat(new Date(), 'yyyyMMdd');
    const isOpen: number = await CurdTradeCalDao.getIsOpen(todayStr);
    const prevTradeDate: string = await CurdTradeCalDao.getPrevDate(todayStr);
    const tradeDate: string = (!isOpen || new Date().getHours() < 19) ? prevTradeDate : todayStr;
    const ret: {
      total: number,
      list: Record<string, any>[]
    } = await CurdDailyDao.getStocksByLimit({
      ...params,
      date: tradeDate,
    });
    return ret;
  }
}
