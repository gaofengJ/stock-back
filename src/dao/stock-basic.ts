import TStockBasic from '@/models/t.stock-basic';
import TDaily from '@/models/t.daily';
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
    const ret = await TStockBasic.bulkCreate(params);
    return (ret || []).length;
  }

  /**
   * 清空股票基本信息
   * @returns number
   */
  static async truncateDestroy(): Promise<number> {
    const ret: number = await TStockBasic.destroy({
      truncate: true,
    });
    return ret;
  }

  /**
   * 查询股票基本信息
   * @returns Record<string, any>[]
   */
  static async getStocksBasic(): Promise<Record<string, any>[]> {
    const ret: Record<string, any>[] = await TStockBasic.findAll({
      attributes: ['id', 'tsCode', 'symbol', 'name', 'fullname', 'industry', 'area', 'market', 'listStatus', 'listDate', 'isHs'],
      raw: true,
    });
    return ret;
  }

  /**
   * 查询股票基本信息（附带市盈率等信息）
   * @returns { total, list }
   */
  static async getStocks(params: Record<string, string | number>, tradeDate: string): Promise<{
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
      attributes: ['id', 'symbol', 'name', 'fullname', 'industry', 'area', 'market', 'listStatus', 'listDate', 'isHs'],
      raw: true,
      offset: (params.pageNum as number) - 1,
      limit: params.pageSize as number,
      include: [
        {
          model: TDaily,
          attributes: ['open', 'high', 'low', 'close', 'preClose', 'change', 'pctChg', 'vol', 'amount', 'turnoverRate', 'turnoverRateF', 'volumeRatio', 'pe', 'peTtm', 'pb', 'ps', 'psTtm', 'dvRatio', 'dvTtm', 'totalShare', 'floatShare', 'freeShare', 'totalMv', 'circMv'],
          where: {
            tradeDate: {
              [Op.eq]: tradeDate,
            },
          },
        },
      ],
    });
    return {
      total,
      list: list.map((i: Record<string, string | number>) => ({
        id: i.id,
        symbol: i.symbol,
        name: i.name,
        fullname: i.fullname,
        industry: i.industry,
        area: i.area,
        market: i.market,
        listStatus: i.listStatus,
        listDate: i.listDate,
        isHs: i.isHs,
        open: i['t_dailies.open'],
        high: i['t_dailies.high'],
        low: i['t_dailies.low'],
        close: i['t_dailies.close'],
        preClose: i['t_dailies.preClose'],
        change: i['t_dailies.change'],
        pctChg: i['t_dailies.pctChg'],
        vol: i['t_dailies.vol'],
        amount: i['t_dailies.amount'],
        turnoverRate: i['t_dailies.turnoverRate'],
        turnoverRateF: i['t_dailies.turnoverRateF'],
        volumeRatio: i['t_dailies.volumeRatio'],
        pe: i['t_dailies.pe'],
        peTtm: i['t_dailies.peTtm'],
        pb: i['t_dailies.pb'],
        ps: i['t_dailies.ps'],
        psTtm: i['t_dailies.psTtm'],
        dvRatio: i['t_dailies.dvRatio'],
        dvTtm: i['t_dailies.dvTtm'],
        totalShare: i['t_dailies.totalShare'],
        floatShare: i['t_dailies.floatShare'],
        freeShare: i['t_dailies.freeShare'],
        totalMv: i['t_dailies.totalMv'],
        circMv: i['t_dailies.circMv'],
      })),
    };
  }
}
