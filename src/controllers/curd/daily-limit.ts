import {
  JsonController,
  Post,
  BodyParam,
  Delete,
} from 'routing-controllers';
import CurdDailyLimitService from '@/services/curd/daily-limit';
import { dateFormat } from 'mufeng-tools';

@JsonController('/curd/daily-limit')
export default class CurdDailyLimitController {
  /**
   * 每日涨跌停价格批量导入
   * @param date 日期
   * @returns 导入数量
   */
  @Post('/bulk-create')
  async bulkCreate(@BodyParam('date') date: string): Promise<number | null> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(date, 'yyyyMMdd');
    const res: number | null = await CurdDailyLimitService.bulkCreate(date);
    return res;
  }

  /**
   * 删除每日涨跌停价格
   * @returns 提示信息
   */
  @Delete('/destroy')
  async destroy(@BodyParam('date') date: string): Promise<string> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(date, 'yyyyMMdd');
    const res: string = await CurdDailyLimitService.destroy(date);
    return res;
  }
}
