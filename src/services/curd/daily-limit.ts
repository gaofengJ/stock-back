import CurdDailyLimitDao from '@/dao/curd/daily-limit';
import { v4 as uuidv4 } from 'uuid';

import { getDailyLimit } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { log } from 'console';

export default class CurdDailyLimitService {
  /**
   * 每日涨跌停价格批量导入
   * @param date 日期
   * @returns 导入数量
   */
  static async bulkCreate(year: string): Promise<number | null> {
    const { code, data } = await getDailyLimit(year);
    if (code) return null;
    let { fields } = data;
    const { items } = data;
    fields = ['exchange', 'calDate', 'isOpen', 'preTradeDate']; // tushare接口返回字段对不上，所以写死了
    let params = mixinFieldAndItem(fields, items);
    params = params.map((i: Record<string, any>) => ({ // 依次添加id
      id: uuidv4(),
      calDate: i.calDate,
      isOpen: i.isOpen,
      preTradeDate: i.preTradeDate,
    }));
    const res: number = await CurdDailyLimitDao.bulkCreate(params);

    log(`导入交易日历：成功导入${year}年${res}条数据`);
    return res;
  }

  /**
   * 清空交易日历
   * @returns number
   */
  static async destroy(date: string): Promise<string> {
    const res: number = await CurdDailyLimitDao.destroy(date);
    const str = !res ? '清空交易日历：成功' : '清空交易日历：失败';
    log(str);
    return str;
  }
}
