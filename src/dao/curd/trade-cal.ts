// import { Op } from 'sequelize';
import TTradeCal from '@/models/t.trade-cal';

export default class AnalysisStatisticsDao {
  /**
   *
   * @param date
   * @returns
   */
  static async create(params: Record<string, number>) {
    const res = TTradeCal.create({
      id: params.uuid,
      calDate: params.calDate,
      isOpen: params.isOpen,
    });
    console.log(res);
  }

  // /**
  //  *
  //  * @param date
  //  * @returns
  //  */
  // static async bulkCreate() {

  // }

  // /**
  //  * @description 查询涨跌统计
  //  * @param date 日期
  //  * @returns 查询结果
  //  */
  // static async getStatistics(date: string) {
  //   const ret = await TTradeCal.findAll({
  //     attributes: ['pctChange'],
  //     // 当raw的值为true时，这些方法对表进行查询操作后返回的值为从数据库中查询到的原始数据；
  //     // 当raw的值为false时（默认)，这些方法对表进行查询操作后返回的值为sequelize进行装饰过的数据
  //     raw: true,
  //     where: {
  //       tradeDate: {
  //         [Op.eq]: date,
  //       },
  //     },
  //   });
  //   return ret;
  // }
}
