import { arrayGetIntersect, arrayGetMinus } from 'mufeng-tools';
import CurdLimitListDao from '@/dao/limit-list';
import CurdTradeCalDao from '@/dao/trade-cal';

// 取连板数据
const getConnectNum = (
  tempObj: Record<string, string[]>,
  dateList: string[],
): string[] => {
  const len = dateList.length;
  let tempList: any[] = [];
  dateList.forEach((_, i: number) => {
    if (i < len - 2) {
      tempList = arrayGetIntersect(
        tempList.length ? tempList : tempObj[dateList[i]],
        tempObj[dateList[i + 1]],
      ); // 取交集
    }
    if (i === len - 2) {
      tempList = arrayGetMinus(
        tempList.length ? tempList : tempObj[dateList[i]],
        tempObj[dateList[i + 1]],
      ); // 取差集
    }
  });
  return tempList.sort();
};

export default class LimitConnectService {
  /**
   * @description 查询连板数据
   * @param date 日期
   * @returns Record<string, any>[]
   */
  static async getConnects(
    startDate: string,
    endDate: string,
    num: number,
  ): Promise<Record<string, any>[]> {
    // 查询时间区间内的所有日期
    let dateList: string[] = await CurdTradeCalDao.getTradeDateByRange(startDate, endDate);
    // 往前获取num天，以获取startDate的数据
    const prevDateList: string[] = await CurdTradeCalDao.getTradeDateByNum(startDate, num);
    dateList = dateList.concat(prevDateList);
    // 查询所选交易日内的数据
    const res: Record<string, any>[] = await CurdLimitListDao.getConnects(
      dateList[dateList.length - 1],
      dateList[0],
    );
    const tempObj: Record<string, any> = {};
    res.forEach((i: Record<string, any>) => {
      if (tempObj[i.tradeDate]) {
        tempObj[i.tradeDate].push(i.tsCode);
      } else {
        tempObj[i.tradeDate] = [i.tsCode];
      }
    });
    const ret: Record<string, any>[] = [];
    dateList.forEach((_, i: number) => {
      if (i >= dateList.length - num) return; // 多添加的日期无需处理
      const tempCodeList = getConnectNum(tempObj, dateList.slice(i, i + num + 1));
      const tempPrevCodeList = getConnectNum(tempObj, dateList.slice(i + 1, i + num + 1));
      const curObj = {
        tradeDate: dateList[i],
        count: tempCodeList.length,
        promotion: (tempCodeList.length / tempPrevCodeList.length / 0.01).toFixed(0),
        tsCodeList: tempCodeList,
      };
      ret.push(curObj);
    });
    return ret.reverse();
  }
}
