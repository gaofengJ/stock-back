import {
  JsonController,
  Post,
  BodyParam,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import CurdMarketMoodService from '@/services/curd/market-mood';

@JsonController('/curd/market-mood')
export default class CurdMarketMoodController {
  /**
   * 情绪指标单条新增，以2022-01-05为例
   * @param a 2022年01月05日涨停，非一字涨停，非ST
   * @param b 2022年01月04日涨停，非一字涨停，非ST
   * @param c 2022年01月04日涨停，非一字涨停，非ST，2022年201月05日高开
   * @param d 2022年01月04日涨停，非一字涨停，非ST，2022年201月05日上涨
   * @param e 2022年01月05日曾涨停，非ST
   * @param sentimentA 非一字涨停 sentimentA = a
   * @param sentimentB 打板高开率 sentimentB = c / b
   * @param sentimentC 打板成功率 sentimentC = d / b
   * @param sentimentD 打板被砸率 sentimentD = e / (a + e)
   * @returns id
   */
  @Post('/create')
  async create(
    @BodyParam('tradeDate') tradeDate: string,
    @BodyParam('a') a: number,
    @BodyParam('b') b: number,
    @BodyParam('c') c: number,
    @BodyParam('d') d: number,
    @BodyParam('e') e: number,
    @BodyParam('sentimentA') sentimentA: number,
    @BodyParam('sentimentB') sentimentB: number,
    @BodyParam('sentimentC') sentimentC: number,
    @BodyParam('sentimentD') sentimentD: number,
  ): Promise<string> {
    tradeDate = dateFormat(tradeDate, 'yyyyMMdd');
    const ret: string = await CurdMarketMoodService.create({
      tradeDate,
      a,
      b,
      c,
      d,
      e,
      sentimentA,
      sentimentB,
      sentimentC,
      sentimentD,
    });
    return ret;
  }
}
