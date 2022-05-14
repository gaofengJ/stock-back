import TDaily from '@/models/t.daily';
import TStockBasic from '@/models/t.stock-basic';
import { Op, Sequelize } from 'sequelize';

export default class CurdDailyDao {
  /**
   * 每日交易数据批量导入
   * @param <{ tsCode: string, tradeDate: string, open: number,
   * high: number, low: number, close: number, preClose: number, change: number,
   * pctChg: number, vol: number, amount: number, }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: Record<string, any>[],
  ): Promise<number> {
    const res = await TDaily.bulkCreate(params);
    return (res || []).length;
  }

  /**
   * 删除每日交易数据
   * @returns number
   */
  static async destroy(date: string): Promise<number> {
    const res: number = await TDaily.destroy({
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
    });
    return res;
  }

  /**
   * @param date 日期
   * 查询每日交易数据
   */
  static async getDaily(date: string): Promise<Record<string, any>[]> {
    const res = await TDaily.findAll({
      attributes: ['tsCode', 'tradeDate', 'upLimit', 'downLimit', 'open', 'high', 'low', 'close', 'preClose', 'change', 'pctChg'],
      raw: true,
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
      include: [
        {
          model: TStockBasic,
          attributes: ['name'],
        },
      ],
    });
    return res.map((i: Record<string, any>) => ({
      tsCode: i.tsCode,
      tradeDate: i.tradeDate,
      open: i.open,
      high: i.high,
      low: i.low,
      close: i.close,
      preClose: i.preClose,
      change: i.change,
      pctChg: i.pctChg,
      upLimit: i.upLimit,
      downLimit: i.downLimit,
      name: i['t_stock_basic.name'],
    }));
  }

  /**
   * @description 查询涨跌统计
   * @param date 日期
   * @returns 查询结果
   */
  static async getStatistics(date: string): Promise<Record<string, any>[]> {
    const res: Record<string, any>[] = await TDaily.findAll({
      attributes: ['pctChg'],
      // 当raw的值为true时，这些方法对表进行查询操作后返回的值为从数据库中查询到的原始数据；
      // 当raw的值为false时（默认)，这些方法对表进行查询操作后返回的值为sequelize进行装饰过的数据
      raw: true,
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
    });
    return res;
  }

  /**
   * 查询日期范围上涨、下跌、平盘数据
   */
  static async getNum(
    startDate: string,
    endDate: string,
    field: string,
  ): Promise<Record<string, any>[]> {
    const fieldMap: Record<string, any> = {
      up: { [Op.gt]: 0 },
      down: { [Op.lt]: 0 },
      zero: { [Op.eq]: 0 },
    };
    const res: Record<string, any>[] = await TDaily.findAll({
      attributes: [
        'tradeDate',
        [Sequelize.fn('COUNT', Sequelize.col('pct_chg')), field],
      ],
      raw: true,
      group: 'tradeDate',
      where: {
        tradeDate: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        pctChg: fieldMap[field],
      },
      order: [
        ['tradeDate', 'ASC'],
      ],
    });
    return res;
  }
}
