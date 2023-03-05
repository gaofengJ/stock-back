import {
  JsonController,
  Post,
  BodyParam,
  Delete,
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
  @Post('/import')
  async manualImport(@BodyParam('date') date: string): Promise<string> {
    date = dateFormat(new Date(date), 'yyyyMMdd');
    const ret: string = await CurdManualService.manualImport(date);
    return ret;
  }

  /**
   * 手动批量导入每日数据
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns string 成功提示
   */
  // @Post('/bulk-import')
  // async manualBulkImport(
  //   @BodyParam('startDate', { required: true }) startDate: string,
  //   @BodyParam('endDate', { required: true }) endDate: string,
  // ): Promise<string> {
  //   const ret: string = await CurdManualService.manualBulkImport(startDate, endDate);
  //   return ret;
  // }

  /**
   * 手动删除每日数据
   * @param date 交易日期
   * @returns string 成功提示
   */
  @Delete('/destroy')
  async manualDestroy(@BodyParam('date') date: string): Promise<string> {
    date = dateFormat(new Date(date), 'yyyyMMdd');
    const ret: string = await CurdManualService.manualDestroy(date);
    return ret;
  }
}
