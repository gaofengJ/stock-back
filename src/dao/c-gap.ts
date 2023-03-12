import TCGap from '@/models/t.c-gap';
import type { IGapItem } from '@/types/gap';
import { Op } from 'sequelize';

export default class CurdDailyDao {
  /**
   * 每日缺口数据导入
   * @param Record<string, any>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: Partial<IGapItem>[],
  ): Promise<number> {
    const ret = await TCGap.bulkCreate(params);
    return (ret || []).length;
  }

  /**
   * 更新缺口数据
   * @param Record<string, any>
   * @returns
   */
  static async updatePctChg(
    params: {
      tsCode: string;
      addDate: string;
      gapDays?: number;
      gapPctChg2?: number;
      gapPctChg3?: number;
      gapPctChg4?: number;
      gapPctChg5?: number;
      gapPctChg?: number;
    },
  ): Promise<number> {
    const ret = await TCGap.update({
      gapDays: params.gapDays,
      gapPctChg2: params.gapPctChg2,
      gapPctChg3: params.gapPctChg3,
      gapPctChg4: params.gapPctChg4,
      gapPctChg5: params.gapPctChg5,
      gapPctChg: params.gapPctChg,
    }, {
      where: {
        addDate: {
          [Op.eq]: params.addDate,
        },
        tsCode: {
          [Op.eq]: params.tsCode,
        },
      },
    });
    return ret[0];
  }

  /**
   * 批量关闭缺口
   * @param params string[]
   * @returns number
   */
  static async updateGapClose(params: {
    date: string,
    gapCloseList: string[];
  }): Promise<number> {
    const ret = await TCGap.update({
      closeDate: params.date,
      status: 0,
    }, {
      where: {
        tsCode: {
          [Op.in]: params.gapCloseList,
        },
      },
    });
    return ret[0];
  }

  /**
   * 清空股票基本信息
   * @returns number
   */
  static async truncateDestroy(): Promise<number> {
    const ret: number = await TCGap.destroy({
      truncate: true,
    });
    return ret;
  }

  /**
   * @param date 日期
   * 查询缺口数据
   */
  static async getGap(params: {
    status?: number;
  }): Promise<IGapItem[]> {
    const ret = await TCGap.findAll({
      raw: true,
      where: {
        gapDays: {
          [Op.lt]: 10,
        },
        status: {
          [Op.eq]: params.status,
        },
      },
    });
    return ret;
  }
}
