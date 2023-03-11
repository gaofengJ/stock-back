import TCGap from '@/models/t.c-gap';
import { Op } from 'sequelize';

export default class CurdDailyDao {
  /**
   * 每日缺口数据导入
   * @param Record<string, any>[]
   * @returns 导入数量
   */
  static async bulkCreate(
    params: Record<string, any>[],
  ): Promise<number> {
    const res = await TCGap.bulkCreate(params);
    return (res || []).length;
  }

  /**
   * 更新缺口数据
   * @param Record<string, any>
   * @returns
   */
  static async update(
    params: Record<string, any>,
  ): Promise<number> {
    const res = await TCGap.update(params, {
      where: {
        tsCode: params.tsCode,
      },
    });
    return (res || []).length;
  }

  /**
   * 删除缺口数据
   * @returns number
   */
  static async destroy(tsCode: string): Promise<number> {
    const res: number = await TCGap.destroy({
      where: {
        tsCode: {
          [Op.eq]: tsCode,
        },
      },
    });
    return res;
  }

  /**
   * @param date 日期
   * 查询缺口数据
   */
  static async getGap(): Promise<Record<string, any>[]> {
    const res = await TCGap.findAll({
      attributes: ['tsCode', 'addDate', 'removeDate', 'gapLow', 'gapUp', 'status'],
      raw: true,
    });
    return res;
  }
}
