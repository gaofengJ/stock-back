import {
  JsonController,
  Post,
  BodyParam,
} from 'routing-controllers';
import CurdTradeCalService from '@/services/curd/trade-cal';

@JsonController('/curd/trade-cal')
export default class CurdTradeCalController {
  @Post('/create')
  async create(
    @BodyParam('calDate') calDate: string,
    @BodyParam('isOpen') isOpen: number,
    @BodyParam('preTradeDate') preTradeDate: string,
  ) {
    const res = await CurdTradeCalService.create({
      calDate,
      isOpen,
      preTradeDate,
    });
    return res;
  }

  @Post('/bulk-import')
  async bulkCreate(@BodyParam('year') year: string) {
    const res = await CurdTradeCalService.bulkImport(year);
    return res;
  }
}
