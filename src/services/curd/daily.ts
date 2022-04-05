import CurdDailyDao from '@/dao/curd/daily';
import { v4 as uuidv4 } from 'uuid';
import { getDaily } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { stringLineToHump } from 'mufeng-tools';
import { log } from 'console';

export default class CurdDailyService {
  /**
   * 每日交易数据批量导入
   * @param date 日期
   * @returns 导入数量
   */
  static async bulkCreate(date: string): Promise<number | null> {
    const { code, data } = await getDaily(date);
    if (code) return null;
    let { fields } = data;
    const { items } = data;
    fields = fields.map((str: string) => (stringLineToHump(str)));
    let params = mixinFieldAndItem(fields, items);
    params = params.map((i: Record<string, any>) => ({ // 依次添加id
      id: uuidv4(),
      tsCode: i.tsCode,
      tradeDate: i.tradeDate,
      open: i.open,
      high: i.high,
      low: i.low,
      close: i.close,
      preClose: i.preClose,
      change: i.change,
      pctChg: i.pctChg,
      vol: i.vol,
      amount: i.amount,
    }));
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
