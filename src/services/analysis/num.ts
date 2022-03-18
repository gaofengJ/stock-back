import AnalysisNumDao from '@/dao/analysis/num';

export default class AnalysisNumService {
  static async getNum(startDate: string, endDate: string, fields: string[]) {
    const res: Array<Record<string, any>> = await AnalysisNumDao.getNum(startDate, endDate, fields);
    return res;
  }
}
