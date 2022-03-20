import CurdTradeCalDao from '@/dao/curd/trade-cal';
import { v4 as uuidv4 } from 'uuid';

import { getTradeCal } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { log } from 'console';

export default class CurdTradeCalService {
  static async create(params: { calDate: string, isOpen: number, preTradeDate: string }) {
    const res = await CurdTradeCalDao.create({
      id: uuidv4(),
      ...params,
    });
    return res;
  }

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

    log(`成功导入${year}年${res}条数据`);
    return res;
  }
}
