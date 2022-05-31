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
  static async getStocks(params: Record<string, string | number>): Promise<{
    total: number,
    list: Record<string, any>[]
  }> {
    let where: Record<string, any> = {};
    if (params.stock) {
      where = {
        ...where,
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${params.stock}%`,
            },
          },
          {
            symbol: {
              [Op.like]: `%${params.stock}%`,
            },
          },
          {
            fullname: {
              [Op.like]: `%${params.stock}%`,
            },
          },
        ],
      };
    }
    if (params.industry) {
      where = {
        ...where,
        industry: {
          [Op.like]: `%${params.industry}%`,
        },
      };
    }
    if (params.area) {
      where = {
        ...where,
        area: {
          [Op.like]: `%${params.area}%`,
        },
      };
    }
    if (params.market) {
      where = {
        ...where,
        market: {
          [Op.eq]: params.market,
        },
      };
    }
    // if (params.isSubNew) {

    // }
    // if (params.isHs)
    const { count: total, rows: list } = await TStockBasic.findAndCountAll({
      where,
      raw: true,
      offset: (params.pageNum as number) - 1,
      limit: params.pageSize as number,
    });
    return {
      total,
      list,
    };
  }
}
