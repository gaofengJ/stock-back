import CurdDailyDao from '@/dao/daily';
import CurdTradeCalDao from '@/dao/trade-cal';

/**
 * 获取每日交易数据（分页）
*/
export default class BasicDailyService {
  static async getDaily(params: Record<string, string | number>): Promise<{
    total: number,
    list: Record<string, any>[]
  }> {
    const isOpen: number = await CurdTradeCalDao.getIsOpen(params.date as string);
    const prevTradeDate: string = await CurdTradeCalDao.getPrevDate(params.date as string);
    const tradeDate: string = (!isOpen || new Date(params.date).getHours() < 18)
      ? prevTradeDate : params.date as string;
    const res: {
      total: number,
      list: Record<string, any>[]
    } = await CurdDailyDao.getDailyByLimit({
      ...params,
      date: tradeDate,
    });
    return res;
  }
}
