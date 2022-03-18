import { Op } from 'sequelize';
import TMarketMood from '@/models/t.market-mood';

export default class AnalysisNumDao {
  static async getNum(startDate: string, endDate: string, fields: string[]) {
    const ret = await TMarketMood.findAll({
      attributes: ['date'].concat(fields || ['up', 'down', 'zero']),
      // 当raw的值为true时，这些方法对表进行查询操作后返回的值为从数据库中查询到的原始数据；
      // 当raw的值为false时（默认)，这些方法对表进行查询操作后返回的值为sequelize进行装饰过的数据
      raw: true,
      where: {
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      order: [
        ['date', 'ASC'],
      ],
    });
    return ret;
  }
}
