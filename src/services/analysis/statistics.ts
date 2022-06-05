import CurdDailyDao from '@/dao/daily';
import CurdTradeCalDao from '@/dao/trade-cal';

export default class AnalysisStatisticsService {
  /**
   * @description 查询涨跌统计
   * @param date 日期
   * @returns Record<string, string | number>[]
   */
  static async getStatistics(date: string): Promise<Record<string, any>[]> {
    const isOpen: number = await CurdTradeCalDao.getIsOpen(date as string);
    const prevTradeDate: string = await CurdTradeCalDao.getPrevDate(date as string);
    const tradeDate: string = (!isOpen || new Date(date).getHours() < 19)
      ? prevTradeDate : date as string;
    const res: Record<string, any>[] = await CurdDailyDao.getStatistics(tradeDate);
    const ret: Record<string, string | number>[] = [
      { key: '<-9', value: 0 },
      { key: '-9~-8', value: 0 },
      { key: '-8~-7', value: 0 },
      { key: '-7~-6', value: 0 },
      { key: '-6~-5', value: 0 },
      { key: '-5~-4', value: 0 },
      { key: '-4~-3', value: 0 },
      { key: '-3~-2', value: 0 },
      { key: '-2~-1', value: 0 },
      { key: '-1~0', value: 0 },
      { key: '0', value: 0 },
      { key: '0~1', value: 0 },
      { key: '1~2', value: 0 },
      { key: '2~3', value: 0 },
      { key: '3~4', value: 0 },
      { key: '4~5', value: 0 },
      { key: '5~6', value: 0 },
      { key: '6~7', value: 0 },
      { key: '7~8', value: 0 },
      { key: '8~9', value: 0 },
      { key: '>9', value: 0 },
    ];
    res.forEach((i: any) => {
      if (i.pctChg <= -9) {
        (ret[0].value as number) += 1;
        return;
      }
      if (i.pctChg < -8) {
        (ret[1].value as number) += 1;
        return;
      }
      if (i.pctChg < -7) {
        (ret[2].value as number) += 1;
        return;
      }
      if (i.pctChg < -6) {
        (ret[3].value as number) += 1;
        return;
      }
      if (i.pctChg < -5) {
        (ret[4].value as number) += 1;
        return;
      }
      if (i.pctChg < -4) {
        (ret[5].value as number) += 1;
        return;
      }
      if (i.pctChg < -3) {
        (ret[6].value as number) += 1;
        return;
      }
      if (i.pctChg < -2) {
        (ret[7].value as number) += 1;
        return;
      }
      if (i.pctChg < -1) {
        (ret[8].value as number) += 1;
        return;
      }
      if (i.pctChg < 0) {
        (ret[9].value as number) += 1;
        return;
      }
      if (i.pctChg === 0) {
        (ret[10].value as number) += 1;
        return;
      }
      if (i.pctChg <= 1) {
        (ret[11].value as number) += 1;
        return;
      }
      if (i.pctChg <= 2) {
        (ret[12].value as number) += 1;
        return;
      }
      if (i.pctChg <= 3) {
        (ret[13].value as number) += 1;
        return;
      }
      if (i.pctChg <= 4) {
        (ret[14].value as number) += 1;
        return;
      }
      if (i.pctChg <= 5) {
        (ret[15].value as number) += 1;
        return;
      }
      if (i.pctChg <= 6) {
        (ret[16].value as number) += 1;
        return;
      }
      if (i.pctChg <= 7) {
        (ret[17].value as number) += 1;
        return;
      }
      if (i.pctChg <= 8) {
        (ret[18].value as number) += 1;
        return;
      }
      if (i.pctChg <= 9) {
        (ret[19].value as number) += 1;
        return;
      }
      if (i.pctChg > 9) {
        (ret[20].value as number) += 1;
      }
    });
    return ret;
  }
}
