import AnalysisStatisticsDao from '@/dao/analysis/statistics';

export default class AnalysisStatisticsService {
  static async getStatistics(date: string) {
    const res: Array<Record<string, any>> = await AnalysisStatisticsDao.getStatistics(date);
    const ret: Array<Record<string, string | number>> = [
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
      if (i.pctChange <= -9) {
        (ret[0].value as number) += 1;
        return;
      }
      if (i.pctChange < -8) {
        (ret[1].value as number) += 1;
        return;
      }
      if (i.pctChange < -7) {
        (ret[2].value as number) += 1;
        return;
      }
      if (i.pctChange < -6) {
        (ret[3].value as number) += 1;
        return;
      }
      if (i.pctChange < -5) {
        (ret[4].value as number) += 1;
        return;
      }
      if (i.pctChange < -4) {
        (ret[5].value as number) += 1;
        return;
      }
      if (i.pctChange < -3) {
        (ret[6].value as number) += 1;
        return;
      }
      if (i.pctChange < -2) {
        (ret[7].value as number) += 1;
        return;
      }
      if (i.pctChange < -1) {
        (ret[8].value as number) += 1;
        return;
      }
      if (i.pctChange < 0) {
        (ret[9].value as number) += 1;
        return;
      }
      if (i.pctChange === 0) {
        (ret[10].value as number) += 1;
        return;
      }
      if (i.pctChange <= 1) {
        (ret[11].value as number) += 1;
        return;
      }
      if (i.pctChange <= 2) {
        (ret[12].value as number) += 1;
        return;
      }
      if (i.pctChange <= 3) {
        (ret[13].value as number) += 1;
        return;
      }
      if (i.pctChange <= 4) {
        (ret[14].value as number) += 1;
        return;
      }
      if (i.pctChange <= 5) {
        (ret[15].value as number) += 1;
        return;
      }
      if (i.pctChange <= 6) {
        (ret[16].value as number) += 1;
        return;
      }
      if (i.pctChange <= 7) {
        (ret[17].value as number) += 1;
        return;
      }
      if (i.pctChange <= 8) {
        (ret[18].value as number) += 1;
        return;
      }
      if (i.pctChange <= 9) {
        (ret[19].value as number) += 1;
        return;
      }
      if (i.pctChange > 9) {
        (ret[20].value as number) += 1;
      }
    });
    return ret;
  }
}
