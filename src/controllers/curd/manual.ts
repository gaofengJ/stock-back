import {
  JsonController,
  Post,
  BodyParam,
} from 'routing-controllers';
import CurdManualService from '@/services/curd/manual';
import { dateFormat } from 'mufeng-tools';

@JsonController('/curd/manual')
export default class CurdManualController {
  /**
   * 手动导入每日数据
   * @param date 交易日期
   * @returns string 成功提示
   */
  @Post('/')
  async manual(@BodyParam('date') date: string): Promise<string> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(new Date(date), 'yyyyMMdd');
    const res: string = await CurdManualService.manual(date);
    return res;
  }
}
