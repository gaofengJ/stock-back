import {
  JsonController,
  Post,
  BodyParam,
  Delete,
} from 'routing-controllers';
import CurdDailyLimitService from '@/services/curd/daily-limit';

@JsonController('/curd/daily-limit')
export default class CurdDailyLimitController {
  /**
   * 每日涨跌停价格批量导入
   * @param date 日期
   * @returns 导入数量
   */
  @Post('/bulk-create')
  async bulkCreate(@BodyParam('date') date: string): Promise<number | null> {
    const res: number | null = await CurdDailyLimitService.bulkCreate(date);
    return res;
  }

  /**
   * 清空交易日历
   * @returns 提示信息
   */
  @Delete('/destroy')
  async destroy(@BodyParam('date') date: string): Promise<string> {
    const res: string = await CurdDailyLimitService.destroy(date);
    return res;
  }
}
