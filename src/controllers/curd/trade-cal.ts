import {
  JsonController,
  Post,
  BodyParam,
  Delete,
} from 'routing-controllers';
import CurdTradeCalService from '@/services/curd/trade-cal';

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
   * 清空交易日历
   * @returns 提示信息
   */
  @Delete('/truncate-destroy')
  async truncateDestroy(): Promise<string> {
    const res: string = await CurdTradeCalService.truncateDestroy();
    return res;
  }
}
