import CurdLimitListDao from '@/dao/curd/limit-list';
import { v4 as uuidv4 } from 'uuid';
import { getLimitList } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { stringLineToHump } from 'mufeng-tools';
import { log } from 'console';

export default class CurdLimitListService {
  /**
   * 每日涨跌停个股批量导入
   * @param date 日期
   * @returns 导入数量
   */
  static async bulkCreate(date: string): Promise<number | null> {
    const { code, data } = await getLimitList(date);
    if (code) return null;
    let { fields } = data;
    const { items } = data;
    fields = fields.map((str: string) => (stringLineToHump(str)));
    let params = mixinFieldAndItem(fields, items);
    params = params.map((i: Record<string, any>) => ({ // 依次添加id
      id: uuidv4(),
      tradeDate: i.tradeDate,
      tsCode: i.tsCode,
      name: i.name,
      close: i.close,
      pctChg: i.pctChg,
      amp: i.amp,
      fcRatio: i.fcRatio,
      flRatio: i.flRatio,
      fdAmount: i.fdAmount,
      firstTime: i.firstTime,
      lastTime: i.lastTime,
      openTimes: i.openTimes,
      strth: i.strth,
      limit: i.limit,
    }));
    const res: number = await CurdLimitListDao.bulkCreate(params);
    log(`导入每日涨跌停个股：成功导入${date}共${res}条数据`);
    return res;
  }

  /**
   * 删除每日涨跌停个股
   * @returns number
   */
  static async destroy(date: string): Promise<string> {
    const res: number = await CurdLimitListDao.destroy(date);
    const str: string = `删除每日涨跌停个股：成功删除${date}共${res}条数据`;
    log(str);
    return str;
  }

  /**
   * 查询当日涨停数据
   * @param date 日期
   * @returns Record<string, any>[]
   */
  static async getLimitU(date: string): Promise<Record<string, any>[]> {
    const res: Record<string, any>[] = await CurdLimitListDao.getLimitU(date);
    return res;
  }
}
