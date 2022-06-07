import CurdLimitListDao from '@/dao/limit-list';
import CurdStockBasicDao from '@/dao/stock-basic';
import LimitEchelonService from '@/services/limit/echelon';
// import CurdTradeCalDao from '@/dao/trade-cal';

export default class LimitReviewService {
  /**
   * 查询涨停板复盘数据
   * @param date 日期
   */
  static async getReview(date: string): Promise<Record<string, any>[]> {
    // 查询股票基本信息
    const stockList: Record<string, any>[] = await CurdStockBasicDao.getStocksBasic();
    const tempStockObj: Record<string, any> = {};
    stockList.forEach((item: Record<string, any>) => {
      tempStockObj[item.tsCode] = item;
    });

    // 查询连板数据
    const echelonList: Record<string, any>[] = await LimitEchelonService.getEchelon(date);

    // 查询今日涨停数据
    const fields = ['tradeDate', 'tsCode', 'name', 'close', 'pctChg', 'amp', 'fcRatio', 'flRatio', 'fdAmount', 'firstTime', 'lastTime', 'openTimes', 'strth'];
    let res: Record<string, any>[] = await CurdLimitListDao.getLimitU(date, fields);
    res = res.map((item: Record<string, any>) => ({
      ...item,
      industry: tempStockObj[item.tsCode]?.industry,
      market: tempStockObj[item.tsCode]?.market,
      connectNum: echelonList.find(
        (innerItem: Record<string, any>) => item.tsCode === innerItem.tsCode,
      )?.connectNum,
    }));
    return res.sort((a: any, b: any) => b.connectNum - a.connectNum);
  }
}
