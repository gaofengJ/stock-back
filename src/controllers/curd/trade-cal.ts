import {
  JsonController,
  Post,
  BodyParam,
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
  @Post('/bulk-import')
  async bulkCreate(@BodyParam('year') year: string) {
    const res = await CurdTradeCalService.bulkImport(year);
    return res;
  }
}
