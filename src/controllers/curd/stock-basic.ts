import {
  Delete,
  JsonController,
  Post,
} from 'routing-controllers';
import CurdStockBasicService from '@/services/curd/stock-basic';

@JsonController('/curd/stock-basic')
export default class CurdStockBasicController {
  /**
   * 股票基本信息批量导入
   * @param exchanges 交易所名称 交易所 SSE上交所 SZSE深交所 BSE北交所
   * @returns 导入数量
   */
  @Post('/bulk-create')
  async bulkCreate(): Promise<number | null> {
    const exchanges: string[] = ['SSE', 'SZSE'];
    const res: number | null = await CurdStockBasicService.bulkCreate(exchanges);
    return res;
  }

  /**
   * 清空股票基本信息
   * @returns 提示信息
   */
  @Delete('/truncate-destroy')
  async truncateDestroy(): Promise<string> {
    const res: string = await CurdStockBasicService.truncateDestroy();
    return res;
  }
}
