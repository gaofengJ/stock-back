import {
  JsonController,
  Post,
  BodyParam,
  Delete,
} from 'routing-controllers';
import CurdLimitListService from '@/services/curd/limit-list';
import { dateFormat } from 'mufeng-tools';

@JsonController('/curd/limit-list')
export default class CurdLimitListController {
  /**
   * 每日涨跌停个股批量导入
   * @param date 日期
   * @returns 导入数量
   */
  @Post('/bulk-create')
  async bulkCreate(@BodyParam('date') date: string): Promise<number | null> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(date, 'yyyyMMdd');
    const res: number | null = await CurdLimitListService.bulkCreate(date);
    return res;
  }

  /**
   * 删除每日涨跌停个股
   * @returns 提示信息
   */
  @Delete('/destroy')
  async destroy(@BodyParam('date') date: string): Promise<string> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(date, 'yyyyMMdd');
    const res: string = await CurdLimitListService.destroy(date);
    return res;
  }
}
