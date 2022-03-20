import TTradeCal from '@/models/t.trade-cal';

export default class CurdTradeCalDao {
  static async create(
    params: {
      id: string,
      calDate: string,
      isOpen: number,
      preTradeDate: string,
    },
  ) {
    const tradeCal = await TTradeCal.create(params);
    return tradeCal.get('id'); // 返回id
  }

  static async bulkCreate(
    params: Array<{ id: string, calDate: string, isOpen: number, preTradeDate: string }>,
  ) {
    const res = await TTradeCal.bulkCreate(params);
    return (res || []).length;
  }

  static getIsOpen() {

  }
}
