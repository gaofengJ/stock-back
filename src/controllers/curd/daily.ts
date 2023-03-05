import {
  JsonController,
  Post,
  BodyParam,
  Delete,
  Get,
  QueryParam,
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
    date = dateFormat(date, 'yyyyMMdd');
    const ret: number | null = await CurdDailyService.bulkCreate(date);
    return ret;
  }

  /**
   * 删除每日交易数据
   * @returns 提示信息
   */
  @Delete('/destroy')
  async destroy(@BodyParam('date') date: string): Promise<string> {
    date = dateFormat(date, 'yyyyMMdd');
    const ret: string = await CurdDailyService.destroy(date);
    return ret;
  }

  /**
   * @param date 日期
   * 查询每日交易数据
   */
  @Get('/')
  async getDaily(@QueryParam('date') date: string): Promise<Record<string, any>[]> {
    date = dateFormat(date, 'yyyyMMdd');
    const ret: Record<string, any>[] = await CurdDailyService.getDaily(date);
    return ret;
  }
}
