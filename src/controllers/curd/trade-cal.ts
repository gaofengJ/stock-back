import {
  JsonController,
  Post,
  BodyParam,
  Delete,
  Get,
  QueryParam,
} from 'routing-controllers';
import CurdTradeCalService from '@/services/curd/trade-cal';
import { dateFormat } from 'mufeng-tools';

@JsonController('/curd/trade-cal')
export default class CurdTradeCalController {
  /**
   * 交易日历单条新增
   * @param calDate 交易日期
   * @param isOpen 是否为交易日 0：否 1：是
   * @param preTradeDate 上一个交易日
   * @returns id
   */
  @Post('/create')
  async create(
    @BodyParam('calDate') calDate: string,
    @BodyParam('isOpen') isOpen: number,
    @BodyParam('preTradeDate') preTradeDate: string,
  ): Promise<string> {
    const ret: string = await CurdTradeCalService.create({
      calDate,
      isOpen,
      preTradeDate,
    });
    return ret;
  }

  /**
   * 交易日历批量导入
   * @param year 年
   * @returns 导入数量
   */
  @Post('/bulk-create')
  async bulkCreate(@BodyParam('year') year: string): Promise<number | null> {
    const ret: number | null = await CurdTradeCalService.bulkCreate(year);
    return ret;
  }

  /**
   * 获取时间段内的所有交易日
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns string[]
   */
  @Get('/list')
  async getList(
    @QueryParam('startDate') startDate: string,
    @QueryParam('endDate') endDate: string,
  ): Promise<{list: string[]}> {
    startDate = dateFormat(new Date(startDate), 'yyyyMMdd');
    endDate = dateFormat(new Date(endDate), 'yyyyMMdd');
    const ret: string[] = await CurdTradeCalService.getList(startDate, endDate);
    return {
      list: ret,
    };
  }

  /**
   * 清空交易日历
   * @returns 提示信息
   */
  @Delete('/truncate-destroy')
  async truncateDestroy(): Promise<number> {
    const ret: number = await CurdTradeCalService.truncateDestroy();
    return ret;
  }

  /**
   * 查询日期是否为交易日
   * @param date 日期
   * @returns isOpen 0：否 1：是
   */
  @Get('/get-is-open')
  async getIsOpen(
    @QueryParam('date', { required: true }) date: string,
  ): Promise<boolean> {
    date = dateFormat(new Date(date), 'yyyyMMdd');
    const ret: boolean = await CurdTradeCalService.getIsOpen(date);
    return ret;
  }

  /**
   * 查询上一个交易日
   * @param date 日期
   */
  @Get('/get-prev-date')
  async getPrevDate(
    @QueryParam('date', { required: true }) date: string,
  ): Promise<string> {
    date = dateFormat(new Date(date), 'yyyyMMdd');
    const ret: string = await CurdTradeCalService.getPrevDate(date);
    return ret;
  }
}
