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
    const res: string = await CurdTradeCalService.create({
      calDate,
      isOpen,
      preTradeDate,
    });
    return res;
  }

  /**
   * 交易日历批量导入
   * @param year 年
   * @returns 导入数量
   */
  @Post('/bulk-create')
  async bulkCreate(@BodyParam('year') year: string): Promise<number | null> {
    const res: number | null = await CurdTradeCalService.bulkCreate(year);
    return res;
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
  ): Promise<Record<string, any>> {
    // eslint-disable-next-line no-param-reassign
    startDate = dateFormat(new Date(startDate), 'yyyyMMdd');
    // eslint-disable-next-line no-param-reassign
    endDate = dateFormat(new Date(endDate), 'yyyyMMdd');
    const res: string[] = await CurdTradeCalService.getList(startDate, endDate);
    return {
      list: res,
    };
  }

  /**
   * 清空交易日历
   * @returns 提示信息
   */
  @Delete('/truncate-destroy')
  async truncateDestroy(): Promise<string> {
    const res: string = await CurdTradeCalService.truncateDestroy();
    return res;
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
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(new Date(date), 'yyyyMMdd');
    const res: boolean = await CurdTradeCalService.getIsOpen(date);
    return res;
  }

  /**
   * 查询上一个交易日
   * @param date 日期
   */
  @Get('/get-prev-date')
  async getPrevDate(
    @QueryParam('date', { required: true }) date: string,
  ): Promise<string> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(new Date(date), 'yyyyMMdd');
    const res: string = await CurdTradeCalService.getPrevDate(date);
    return res;
  }
}
