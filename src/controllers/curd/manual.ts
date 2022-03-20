import {
  JsonController,
  Post,
  BodyParam,
} from 'routing-controllers';
import shellTradeCal from '@/shell/tushare/trade-cal';

@JsonController('/shell/manual')
export default class ShellController {
  @Post('/')
  async tradeCal(@BodyParam('year') year: string) {
    const res = await shellTradeCal(year);
    return res;
  }
}
