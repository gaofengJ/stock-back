import CurdDailyDao from '@/dao/daily';
import CustomGapDao from '@/dao/c-gap';
import { log } from 'console';

export default class CustomGapService {
  /**
   * 每日缺口数据导入
   * @param date 日期
   * @returns 导入数量
   */
  static async bulkCreate(date: string): Promise<Record<string, number>> {
    const dailyData: Record<string, any>[] = await CurdDailyDao.getDaily(date); // 查询当日交易数据
    const GapData: Record<string, any>[] = await CustomGapDao.getGap(); // 查询所有缺口数据
    const GapDataObj: Record<string, any> = {}; // Array -> Obj，降低时间复杂度
    GapData.forEach((i: Record<string, any>) => {
      GapDataObj[i.tsCode] = i;
    });

    const existList: Record<string, any>[] = []; // 暂存表中已存在数据
    const nonExistList: Record<string, any>[] = []; // 暂存表中不存在的数据
    dailyData.forEach((i: Record<string, any>) => {
      const tempGapData: Record<string, any> = GapDataObj[i.tsCode];
      if (tempGapData && i.low > i.preClose) { // 表中已有数据且当日有缺口
        existList.push({
          ...tempGapData,
          addDate: date,
          gapLow: i.preClose,
          gapUp: i.low,
          status: 1,
        });
      }
      if (tempGapData && i.close < tempGapData.gapLow) { // 表中已有数据且当日缺口封闭
        existList.push({
          ...tempGapData,
          removeDate: date,
          status: 0,
        });
      }
      if (!tempGapData && i.low > i.preClose) {
        nonExistList.push(i);
      }
    });
    await CustomGapDao.bulkCreate(nonExistList); // 批量导入新增数据
    for (let i = 0; i < existList.length; i += 1) { // 循环更新数据
      // eslint-disable-next-line no-await-in-loop
      await CustomGapDao.update(existList[i]);
    }
    log(`导入每日缺口数据：${date}成功新增${nonExistList.length}数据，更新${existList.length}条数据`);
    return {
      addNum: nonExistList.length,
      updateNum: existList.length,
    };
  }

  /**
   * 更新缺口数据
   * @param date 日期
   * @returns number
   */
  static async update(params: Record<string, any>): Promise<any> {
    await CustomGapDao.update(params);
    const str: string = `更新缺口数据：成功更新${params.tsCode}的数据`;
    log(str);
    return str;
  }

  /**
   * 删除每日缺口数据
   * @param date 日期
   * @returns number
   */
  static async destroy(tsCode: string): Promise<string> {
    await CustomGapDao.destroy(tsCode);
    const str: string = `删除每日缺口数据：成功删除${tsCode}的数据`;
    log(str);
    return str;
  }

  /**
   * @param date 日期
   * 查询每日缺口数据
   */
  static async getGap(): Promise<Record<string, any>[]> {
    const res: Record<string, any>[] = await CustomGapDao.getGap();
    return res;
  }
}
