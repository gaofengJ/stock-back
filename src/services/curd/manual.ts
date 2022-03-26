import CurdTradeCalService from '@/services/curd/trade-cal';
// import { v4 as uuidv4 } from 'uuid';

// import { getTradeCal } from '@/api/tushare/index';
// import { mixinFieldAndItem } from '@/utils';
// import { log } from 'console';

export default class CurdManualService {
  static async manual(date: string): Promise<boolean> {
    const isOpen: boolean = await CurdTradeCalService.getIsOpen(date);
    // const res = await CurdTradeCalDao.create({
    //   date,
    // });
    // return res;
    return isOpen;
  }
  // getTradeCal() {

  // }
}
