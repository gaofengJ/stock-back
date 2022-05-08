import CurdDailyDao from '@/dao/curd/daily';
import { getDaily, getDailyLimit } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { stringLineToHump } from 'mufeng-tools';
import { log } from 'console';

// 合并每日交易数据和每日涨跌停价格数据
function mixinDailyAndLimit(
  dailyArr: Record<string, any>[], limitArr: Record<string, any>[],
): Record<string, any>[] {
  if (!dailyArr.length || !limitArr.length) return dailyArr.concat(limitArr);
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
    if (dailyCode || limitCode) return null;
    let { fields: dailyFields } = dailyData;
    const { items: dailyItems } = dailyData;
    let { fields: limitFields } = limitData;
    const { items: limitItems } = limitData;
    dailyFields = dailyFields.map((str: string) => (stringLineToHump(str)));
    const dailyParams = mixinFieldAndItem(dailyFields, dailyItems);
    limitFields = limitFields.map((str: string) => (stringLineToHump(str)));
    const limitParams = mixinFieldAndItem(limitFields, limitItems);
    const params: Record<string, any>[] = mixinDailyAndLimit(dailyParams, limitParams);
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
