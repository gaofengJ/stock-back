import CurdLimitListDao from '@/dao/limit-list';
import { getLimitList } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { stringLineToHump } from 'mufeng-tools';

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
    const params = mixinFieldAndItem(fields, items);
    const ret: number = await CurdLimitListDao.bulkCreate(params);
    console.info(`导入每日涨跌停个股：成功导入${date}共${ret}条数据`);
    return ret;
  }

  /**
   * 删除每日涨跌停个股
   * @returns number
   */
  static async destroy(date: string): Promise<string> {
    const ret: number = await CurdLimitListDao.destroy(date);
    const str: string = `删除每日涨跌停个股：成功删除${date}共${ret}条数据`;
    console.info(str);
    return str;
  }

  /**
   * 查询当日涨停数据
   * @param date 日期
   * @returns Record<string, any>[]
   */
  static async getLimit(date: string): Promise<Record<string, any>[]> {
    const ret: Record<string, any>[] = await CurdLimitListDao.getLimit(date);
    return ret;
  }
}
