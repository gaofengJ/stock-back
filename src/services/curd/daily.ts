import CurdDailyDao from '@/dao/daily';
import { getDaily, getDailyLimit, getDailyBasic } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { stringLineToHump } from 'mufeng-tools';
import { log } from 'console';

// 合并每日交易数据和每日涨跌停价格数据
function mixinDailyAndLimit(
  dailyArr: Record<string, any>[],
  limitArr: Record<string, any>[],
  basicArr: Record<string, any>[],
): Record<string, any>[] {
  if (!dailyArr.length || !limitArr.length || !basicArr.length) return [];
  const tempObj: Record<string, any> = {}; // 使用obj存储降低时间复杂度
  dailyArr.forEach((i: Record<string, any>) => {
    if (tempObj[`${i.tradeDate}${i.tsCode}`]) return;
    tempObj[`${i.tradeDate}${i.tsCode}`] = i;
  });
  limitArr.forEach((i: Record<string, any>) => {
    if (!tempObj[`${i.tradeDate}${i.tsCode}`]) return;
    tempObj[`${i.tradeDate}${i.tsCode}`].upLimit = i.upLimit;
    tempObj[`${i.tradeDate}${i.tsCode}`].downLimit = i.downLimit;
  });
  basicArr.forEach((i: Record<string, any>) => {
    if (!tempObj[`${i.tradeDate}${i.tsCode}`]) return;
    tempObj[`${i.tradeDate}${i.tsCode}`].turnoverRate = i.turnoverRate;
    tempObj[`${i.tradeDate}${i.tsCode}`].turnoverRateF = i.turnoverRateF;
    tempObj[`${i.tradeDate}${i.tsCode}`].volumeRatio = i.volumeRatio;
    tempObj[`${i.tradeDate}${i.tsCode}`].pe = i.pe;
    tempObj[`${i.tradeDate}${i.tsCode}`].peTtm = i.peTtm;
    tempObj[`${i.tradeDate}${i.tsCode}`].pb = i.pb;
    tempObj[`${i.tradeDate}${i.tsCode}`].ps = i.ps;
    tempObj[`${i.tradeDate}${i.tsCode}`].psTtm = i.psTtm;
    tempObj[`${i.tradeDate}${i.tsCode}`].dvRatio = i.dvRatio;
    tempObj[`${i.tradeDate}${i.tsCode}`].dvTtm = i.dvTtm;
    tempObj[`${i.tradeDate}${i.tsCode}`].totalShare = i.totalShare;
    tempObj[`${i.tradeDate}${i.tsCode}`].floatShare = i.floatShare;
    tempObj[`${i.tradeDate}${i.tsCode}`].freeShare = i.freeShare;
    tempObj[`${i.tradeDate}${i.tsCode}`].totalMv = i.totalMv;
    tempObj[`${i.tradeDate}${i.tsCode}`].circMv = i.circMv;
  });
  return Object.values(tempObj).filter((i: Record<string, any>) => i.upLimit && i.downLimit);
}

export default class CurdDailyService {
  /**
   * 每日交易数据批量导入
   * @param date 日期
   * @returns 导入数量
   */
  static async bulkCreate(date: string): Promise<number | null> {
    const { code: dailyCode, data: dailyData } = await getDaily(date);
    const { code: limitCode, data: limitData } = await getDailyLimit(date);
    const { code: basicCode, data: basicData } = await getDailyBasic(date);
    if (dailyCode || limitCode || basicCode) return null;
    let { fields: dailyFields } = dailyData;
    const { items: dailyItems } = dailyData;
    let { fields: limitFields } = limitData;
    const { items: limitItems } = limitData;
    let { fields: basicFields } = basicData;
    const { items: basicItems } = basicData;
    dailyFields = dailyFields.map((str: string) => (stringLineToHump(str)));
    const dailyParams = mixinFieldAndItem(dailyFields, dailyItems);
    limitFields = limitFields.map((str: string) => (stringLineToHump(str)));
    const limitParams = mixinFieldAndItem(limitFields, limitItems);
    basicFields = basicFields.map((str: string) => (stringLineToHump(str)));
    const basicParams = mixinFieldAndItem(basicFields, basicItems);
    const params: Record<string, any>[] = mixinDailyAndLimit(dailyParams, limitParams, basicParams);
    const res: number = await CurdDailyDao.bulkCreate(params);
    log(`导入每日交易数据：成功导入${date}共${res}条数据`);
    return res;
  }

  /**
   * 删除每日交易数据
   * @param date 日期
   * @returns number
   */
  static async destroy(date: string): Promise<string> {
    const res: number = await CurdDailyDao.destroy(date);
    const str: string = `删除每日交易数据：成功删除${date}共${res}条数据`;
    log(str);
    return str;
  }

  /**
   * @param date 日期
   * 查询每日交易数据
   */
  static async getDaily(date: string): Promise<Record<string, any>[]> {
    const res: Record<string, any>[] = await CurdDailyDao.getDaily(date);
    return res;
  }
}
