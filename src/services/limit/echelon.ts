import CurdLimitListDao from '@/dao/limit-list';
import CurdTradeCalDao from '@/dao/trade-cal';

/**
 * 获取连板数
 * @param obj { key: 日期，value：tsCode[] }
 * @param tsCode { tsCode }
 * @return ret 连板数
 */
const getConnectNum = (
  obj: Record<string, any>,
  tsCode: string,
): number => {
  let ret: number = 0;
  let isBreak: boolean = false;
  Object.keys(obj).sort((a: any, b: any) => b - a).forEach((key: string) => {
    if (obj[key].includes(tsCode) && !isBreak) {
      ret += 1;
    } else {
      isBreak = true;
    }
  });
  return ret;
};

export default class LimitEchelonService {
  /**
   * @description 查询连板数据
   * @param date 日期
   * @returns Record<string, any>[]
   */
  static async getEchelon(
    date: string,
  ): Promise<Record<string, any>[]> {
    // 往前获取num天，以获取连板的数据
    const prevDateList: string[] = await CurdTradeCalDao.getTradeDateByNum(date, 6);
    const dateList = [date].concat(prevDateList);
    // 查询dateList区间内的数据
    const rangeRes: Record<string, any>[] = await CurdLimitListDao.getConnects(
      dateList[dateList.length - 1],
      dateList[0],
    );
    // array -> obj
    const tempRangeObj: Record<string, any> = {};
    rangeRes.forEach((i: Record<string, any>) => {
      if (tempRangeObj[i.tradeDate]) {
        tempRangeObj[i.tradeDate].push(i.tsCode);
      } else {
        tempRangeObj[i.tradeDate] = [i.tsCode];
      }
    });

    const fields = ['tradeDate', 'tsCode', 'name', 'close', 'pctChg', 'amp', 'fcRatio', 'flRatio', 'fdAmount', 'firstTime', 'lastTime', 'openTimes', 'strth'];
    const curDayRes: Record<string, any>[] = await CurdLimitListDao.getLimit(date, fields);

    const ret: Record<string, any>[] = curDayRes.map((item: Record<string, any>) => ({
      ...item,
      connectNum: getConnectNum(tempRangeObj, item.tsCode),
    }));
    return ret.sort((a: any, b: any) => a.connectNum - b.connectNum);
  }
}
