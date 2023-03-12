import CurdDailyDao from '@/dao/daily';
import CustomGapDao from '@/dao/c-gap';
import type { IGapCreateRet, IGapItem } from '@/types/gap';
import type { IDailyItem } from '@/types/daily';
import CurdTradeCalService from '@/services/curd/trade-cal';

export default class CustomGapService {
  /**
   * 每日缺口数据导入
   * @param date 日期
   * @returns 导入数量
   */
  static async bulkImport(date: string): Promise<IGapCreateRet> {
    const removeTotal = await this.remove(date);
    const updateTotal = await this.update(date);
    const addTotal = await this.add(date);
    console.info(`导入每日缺口数据：${date}成功新增${addTotal}数据，更新${updateTotal}条数据，关闭${removeTotal}条数据`);
    return {
      removeTotal,
      updateTotal,
      addTotal,
    };
  }

  /**
   * 新增
   * @returns number
   */
  static async add(date: string): Promise<number> {
    const GapData: IGapItem[] = await CustomGapDao.getGap({
      status: 1,
    }); // 查询缺口存在的缺口数据
    const gapDataObj: Record<string, IGapItem> = {}; // Array -> Obj，降低时间复杂度
    GapData.forEach((i: IGapItem) => {
      gapDataObj[i.tsCode] = i;
    });
    const dailyData: IDailyItem[] = await CurdDailyDao.getDaily(date); // 查询当日交易数据
    const prevTradeDate: string = await CurdTradeCalService.getPrevDate(date); // 查询上一个交易日
    const prevDailyData: IDailyItem[] = await CurdDailyDao.getDaily(prevTradeDate); // 查詢上一日数据
    const prevDailyDataObj: Record<string, IDailyItem> = {}; // Array -> Obj，降低时间复杂度
    prevDailyData.forEach((i: IDailyItem) => {
      prevDailyDataObj[i.tsCode] = i;
    });
    const addList: Partial<IGapItem>[] = [];
    dailyData.forEach((i: IDailyItem) => {
      const tempPrevDailyData = prevDailyDataObj[i.tsCode];
      if (!tempPrevDailyData) return;
      if (i.low > tempPrevDailyData.high
        && (!GapData[i.tsCode as any] || GapData[i.tsCode as any].status === 0)) {
        addList.push({
          tsCode: i.tsCode,
          addDate: date,
          gapTurnoverRate: i.turnoverRate,
          gapTurnoverRateF: i.turnoverRateF,
          gapVolumeRatio: i.volumeRatio,
          gapClose: i.close,
          gapLow: tempPrevDailyData.high,
          gapHigh: i.low,
          gapDays: 0,
          gapPctChg0: 0,
          gapPctChg: 0,
          status: 1,
        });
      }
    });
    const ret = await CustomGapDao.bulkCreate(addList); // 批量导入新增数据
    return ret;
  }

  /**
   * 关闭缺口
   * @returns number
   */
  static async remove(date: string): Promise<number> {
    const GapData: IGapItem[] = await CustomGapDao.getGap({
      status: 1,
    }); // 查询缺口存在的缺口数据
    const dailyData: IDailyItem[] = await CurdDailyDao.getDaily(date); // 查询当日交易数据
    const dailyDataObj: Record<string, IDailyItem> = {}; // Array -> Obj，降低时间复杂度
    dailyData.forEach((i: IDailyItem) => {
      dailyDataObj[i.tsCode] = i;
    });
    const gapCloseList: string[] = [];
    GapData.forEach((i: IGapItem) => {
      const tempDailyData = dailyDataObj[i.tsCode];
      if (!tempDailyData) return;
      if (tempDailyData.close <= i.gapLow) {
        gapCloseList.push(i.tsCode);
      }
    });
    const ret: number = await CustomGapDao.updateGapClose({
      date,
      gapCloseList,
    });
    return ret;
  }

  /**
   * 更新
   * @returns number
   */
  static async update(date: string): Promise<number> {
    const GapData: IGapItem[] = await CustomGapDao.getGap({
      status: 1,
    }); // 查询缺口存在的缺口数据
    const dailyData: IDailyItem[] = await CurdDailyDao.getDaily(date); // 查询当日交易数据
    const dailyDataObj: Record<string, any> = {}; // Array -> Obj，降低时间复杂度
    dailyData.forEach((i: Record<string, any>) => {
      dailyDataObj[i.tsCode] = i;
    });
    let updateTotal = 0;
    for (let i = 0; i < GapData.length; i += 1) {
      const tempGapData = GapData[i];
      const tempDailyData = dailyDataObj[tempGapData.tsCode];
      // eslint-disable-next-line no-continue
      if (!tempDailyData) continue;
      const params = {
        tsCode: tempGapData.tsCode,
        addDate: tempGapData.addDate,
        gapDays: tempGapData.gapDays + 1,
        gapPctChg1: tempGapData.gapDays === 0
          ? tempGapData.gapPctChg0 as number + tempDailyData.pctChg
          : tempGapData.gapPctChg1,
        gapPctChg2: tempGapData.gapDays === 1
          ? tempGapData.gapPctChg1 as number + tempDailyData.pctChg
          : tempGapData.gapPctChg2,
        gapPctChg3: tempGapData.gapDays === 2
          ? tempGapData.gapPctChg2 as number + tempDailyData.pctChg
          : tempGapData.gapPctChg3,
        gapPctChg4: tempGapData.gapDays === 3
          ? tempGapData.gapPctChg3 as number + tempDailyData.pctChg
          : tempGapData.gapPctChg4,
        gapPctChg5: tempGapData.gapDays === 4
          ? tempGapData.gapPctChg4 as number + tempDailyData.pctChg
          : tempGapData.gapPctChg5,
        gapPctChg: tempDailyData.close / tempGapData.gapClose - 1,
      };
      // eslint-disable-next-line no-await-in-loop
      await CustomGapDao.updatePctChg(params);
      updateTotal += 1;
    }
    return updateTotal;
  }

  /**
   * 清空缺口信息表
   * @returns number
   */
  static async truncateDestroy(): Promise<string> {
    const ret: number = await CustomGapDao.truncateDestroy();
    const str = !ret ? '清空缺口信息表：成功' : '清空缺口信息表：失败';
    console.info(str);
    return str;
  }

  /**
   * @param date 日期
   * 查询每日缺口数据
   */
  static async getGap(): Promise<Record<string, any>[]> {
    const ret: Record<string, any>[] = await CustomGapDao.getGap({
      status: 1,
    });
    return ret;
  }
}
