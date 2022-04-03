import TLimitList from '@/models/t.limit-list';
import { Op, Sequelize } from 'sequelize';

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

  static async getLimitUNotLine(dateArr: string[]): Promise<string> {
    const res: Record<string, any> = await TLimitList.findAll({
      attributes: [
        'tsCode',
        [Sequelize.fn('COUNT', Sequelize.col('tsCode')), 'count'],
      ],
      where: {
        [Op.and]: [
          {
            tradeDate: {
              [Op.eq]: date,
            },
          },
          // Sequelize.fn('LOCATE', Sequelize.col('fruit_name'), sample_fruit_string))
          Sequelize.where(Sequelize.fn('LOCATE', Sequelize.col('name'), 'ST'), {
            [Op.eq]: 0,
          }),
          Sequelize.where(Sequelize.fn('LOCATE', Sequelize.col('name'), 'N'), {
            [Op.eq]: 0,
          }),
          Sequelize.where(Sequelize.fn('LOCATE', Sequelize.col('name'), 'C'), {
            [Op.eq]: 0,
          }),
        ],
      },
    });
    return res?.count;
  }
}
