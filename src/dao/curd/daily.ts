import TDaily from '@/models/t.daily';
import TDailyLimit from '@/models/t.daily-limit';
import TStockBasic from '@/models/t.stock-basic';
import { Op } from 'sequelize';

export default class CurdDailyDao {
  /**
   * 每日交易数据批量导入
   * @param <{ id: string, tsCode: string, tradeDate: string, open: number,
   * high: number, low: number, close: number, preClose: number, change: number,
   * pctChg: number, vol: number, amount: number, }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: {
      id: string,
      tsCode: string,
      tradeDate: string,
      open: number,
      high: number,
      low: number,
      close: number,
      preClose: number,
      change: number,
      pctChg: number,
      vol: number,
      amount: number,
    }[],
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
      attributes: ['tsCode', 'tradeDate', 'open', 'high', 'low', 'close', 'preClose', 'change', 'pctChg'],
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
        {
          model: TDailyLimit,
          attributes: ['upLimit', 'downLimit'],
          where: {
            tradeDate: {
              [Op.eq]: date,
            },
          },
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
      name: i['t_stock_basic.name'],
      upLimit: i['t_daily_limit.upLimit'],
      downLimit: i['t_daily_limit.downLimit'],
    }));
  }
}
