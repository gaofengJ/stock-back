import CurdDailyLimitDao from '@/dao/curd/daily-limit';
import { v4 as uuidv4 } from 'uuid';
import { getDailyLimit } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { stringLineToHump } from 'mufeng-tools';
import { log } from 'console';

export default class CurdDailyLimitService {
  /**
   * 每日涨跌停价格批量导入
   * @param date 日期
   * @returns 导入数量
   */
  static async bulkCreate(date: string): Promise<number | null> {
    const { code, data } = await getDailyLimit(date);
    if (code) return null;
    let { fields } = data;
    const { items } = data;
    fields = fields.map((str: string) => (stringLineToHump(str)));

    let params = mixinFieldAndItem(fields, items);
    params = params.map((i: Record<string, any>) => ({ // 依次添加id
      id: uuidv4(),
      tradeDate: i.tradeDate,
      tsCode: i.tsCode,
      upLimit: i.upLimit,
      downLimit: i.downLimit,
    }));
    const res: number = await CurdDailyLimitDao.bulkCreate(params);
    log(`导入每日涨跌停价格：成功导入${date}共${res}条数据`);
    return res;
  }

  /**
   * 删除每日涨跌停价格
   * @returns number
   */
  static async destroy(date: string): Promise<string> {
    const res: number = await CurdDailyLimitDao.destroy(date);
    const str: string = `删除每日涨跌停价格：成功删除${date}共${res}条数据`;
    log(str);
    return str;
  }
}
