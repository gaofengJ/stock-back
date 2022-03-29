import {
  JsonController,
  Post,
  BodyParam,
  Delete,
} from 'routing-controllers';
import CurdDailyService from '@/services/curd/daily';
import { dateFormat } from 'mufeng-tools';

@JsonController('/curd/daily')
export default class CurdDailyController {
  /**
   * 每日交易数据批量导入
   * @param date 日期
   * @returns 导入数量
   */
  @Post('/bulk-create')
  async bulkCreate(@BodyParam('date') date: string): Promise<number | null> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(date, 'yyyyMMdd');
    const res: number | null = await CurdDailyService.bulkCreate(date);
    return res;
  }

  /**
   * 删除每日交易数据
   * @returns 提示信息
   */
  @Delete('/destroy')
  async destroy(@BodyParam('date') date: string): Promise<string> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(date, 'yyyyMMdd');
    const res: string = await CurdDailyService.destroy(date);
    return res;
  }
}
