import CurdTradeCalDao from '@/dao/curd/trade-cal';
import { v4 as uuidv4 } from 'uuid';

import { getTradeCal } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { log } from 'console';

export default class CurdTradeCalService {
  /**
   * 交易日历单条导入
   * @param params { calDate: string, isOpen: number, preTradeDate: string }
   * @returns id
   */
  static async create(
    params: {
      calDate: string,
      isOpen: number,
      preTradeDate: string
    },
  ): Promise<string> {
    const res: string = await CurdTradeCalDao.create({
      id: uuidv4(),
      ...params,
    });
    return res;
  }

  /**
   * 交易日历批量导入
   * @param year 年
   * @returns 导入数量
   */
  static async bulkImport(year: string) {
    const { code, data } = await getTradeCal(year);
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
    const res = await CurdTradeCalDao.bulkCreate(params);

    log(`导入交易日历：成功导入${year}年${res}条数据`);
    return res;
  }

  static async getIsOpen(date: string): Promise<boolean> {
    const res: number = await CurdTradeCalDao.getIsOpen(date);
    return !!res;
  }
}
