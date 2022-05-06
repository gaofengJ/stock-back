import TLimitList from '@/models/t.limit-list';
import TDaily from '@/models/t.daily';
import { Op } from 'sequelize';

export default class CurdLimitListDao {
  /**
   * 每日涨跌停个股批量导入
   * @param <{ id: string, tradeDate: string, tsCode: string, name: string, close: number,
   * pctChg: number, amp: number, fcRatio: number, flRatio: number, fdAmount: number,
   * firstTime: string, lastTime: string, openTimes: number, strth: number, limit: string, }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: {
      id: string,
      tradeDate: string,
      tsCode: string,
      name: string,
      close: number,
      pctChg: number,
      amp: number,
      fcRatio: number,
      flRatio: number,
      fdAmount: number,
      firstTime: string,
      lastTime: string,
      openTimes: number,
      strth: number,
      limit: string,
    }[],
  ): Promise<number> {
    const res = await TLimitList.bulkCreate(params);
    return (res || []).length;
  }

  /**
   * 删除每日涨跌停个股
   * @param date 日期
   * @returns number
   */
  static async destroy(date: string): Promise<number> {
    const res: number = await TLimitList.destroy({
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
    });
    return res;
  }

  /**
   * 查询当日涨停数据
   * @param date 日期
   * @returns Record<string, any>[]
   */
  static async getLimitU(date: string): Promise<Record<string, any>[]> {
    const res: Record<string, any>[] = await TLimitList.findAll({
      attributes: [
        'tradeDate',
        'tsCode',
        'name',
        'amp',
      ],
      raw: true,
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
        limit: {
          [Op.eq]: 'U',
        },
        name: {
          [Op.and]: [
            {
              [Op.notLike]: '%ST%',
            },
            {
              [Op.notLike]: '%N%',
            },
            {
              [Op.notLike]: '%C%',
            },
          ],
        },
      },
      include: [
        {
          model: TDaily,
          attributes: ['open', 'high', 'low', 'close', 'preClose', 'change', 'pctChg'],
          where: {
            tradeDate: {
              [Op.eq]: date,
            },
          },
        },
      ],
    });
    return res.map((i: Record<string, any>) => ({
      tradeDate: i.tradeDate,
      tsCode: i.tsCode,
      name: i.name,
      amp: i.amp,
      open: i['t_daily.open'],
      high: i['t_daily.high'],
      low: i['t_daily.low'],
      close: i['t_daily.close'],
      preClose: i['t_daily.preClose'],
      change: i['t_daily.change'],
      pctChg: i['t_daily.pctChg'],
    }));
  }
}
