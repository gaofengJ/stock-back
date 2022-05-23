import TStockBasic from '@/models/t.stock-basic';
import { Op } from 'sequelize';

export default class CurdStockBasicDao {
  /**
   * 股票基本信息批量导入
   * @param <{
      tsCode: string,
      symbol: string,
      name: string,
      area: string,
      industry: string,
      market: string,
      listDate: string }>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: {
      tsCode: string,
      symbol: string,
      name: string,
      area: string,
      industry: string,
      market: string,
      listDate: string,
    }[],
  ): Promise<number> {
    const res = await TStockBasic.bulkCreate(params);
    return (res || []).length;
  }

  /**
   * 清空股票基本信息
   * @returns number
   */
  static async truncateDestroy(): Promise<number> {
    const res: number = await TStockBasic.destroy({
      truncate: true,
    });
    return res;
  }

  /**
   * 查询股票基本信息
   * @returns { total, list }
   */
  static async getStocks(pageNum: number, pageSize: number): Promise<{
    total: number,
    list: Record<string, any>[]
  }> {
    const { count: total, rows: list } = await TStockBasic.findAndCountAll({
      where: {
        name: {
          [Op.like]: '%银行%',
        },
      },
      raw: true,
      offset: pageNum - 1,
      limit: pageSize,
    });
    return {
      total,
      list,
    };
  }
}
