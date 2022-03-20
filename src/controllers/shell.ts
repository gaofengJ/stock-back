import {
  JsonController,
  Post,
  BodyParam,
  Get,
} from 'routing-controllers';
import shellTradeCal from '@/shell/tushare/trade-cal';

@JsonController('/shell')
export default class ShellController {
  @Get('/')
  shell() {
    return 'shell';
  }

  @Post('/trade-cal')
  async tradeCal(@BodyParam('year') year: string) {
    const res = await shellTradeCal(year);
    return res;
  }
}
