import CurdStockBasicDao from '@/dao/stock-basic';
import { getStockBasic } from '@/api/tushare/index';
import { mixinFieldAndItem } from '@/utils';
import { stringLineToHump } from 'mufeng-tools';
import { log } from 'console';

export default class CurdStockBasicService {
  /**
   * 股票基本信息批量导入
   * @param exchanges 交易所名称 交易所 SSE上交所 SZSE深交所 BSE北交所
   * @returns 导入数量
   */
  static async bulkCreate(exchanges: string[]): Promise<number | null> {
    const [ret0, ret1] = await Promise.all([
      getStockBasic(exchanges[0]), // SSE
      getStockBasic(exchanges[1]), // SZSE
    ]);
    let params: any[] = [];
    let len0: number = 0; // SSE数量
    let len1: number = 0; // SZSE数量
    [ret0, ret1].forEach((obj: Record<string, any>, index: number) => {
      if (obj.code) return;
      let { fields } = obj.data;
      const { items } = obj.data;
      fields = fields.map((str: string) => (stringLineToHump(str)));
      if (index === 0) {
        len0 = items.length;
      }
      if (index === 1) {
        len1 = items.length;
      }
      const innerParams = mixinFieldAndItem(fields, items);
      params = params.concat(innerParams);
    });
    params.forEach((i: Record<string, any>) => {
      if (!i.area) i.area = '';
      if (!i.industry) i.industry = '';
    });
    const ret: number = await CurdStockBasicDao.bulkCreate(params);
    log(`成功导入股票基本信息：成功导入沪市${len0}条数据，深市${len1}条数据，共${ret}条数据`);
    return ret;
  }

  /**
   * 清空股票基本信息
   * @returns number
   */
  static async truncateDestroy(): Promise<string> {
    const ret: number = await CurdStockBasicDao.truncateDestroy();
    const str = !ret ? '清空股票基本信息：成功' : '清空股票基本信息：失败';
    log(str);
    return str;
  }
}
