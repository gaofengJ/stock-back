import { Op } from 'sequelize';
import TDaily from '@/models/t.daily';

export default class AnalysisStatisticsDao {
  static getStatistics(date: string) {
    return TDaily.findAll({
      attributes: ['tsCode', 'name', 'pctChange'],
      // 当raw的值为true时，这些方法对表进行查询操作后返回的值为从数据库中查询到的原始数据；
      // 当raw的值为false时（默认)，这些方法对表进行查询操作后返回的值为sequelize进行装饰过的数据
      raw: true,
      where: {
        tradeDate: {
          [Op.eq]: date,
        },
      },
    });
  }
}
