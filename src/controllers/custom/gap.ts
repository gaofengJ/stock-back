import {
  JsonController,
  Post,
  BodyParam,
  Delete,
  Get,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import CustomGapService from '@/services/custom/gap';

@JsonController('/custom/gap')
export default class CustomGapController {
  /**
   * 每日缺口数据导入
   * @param date 日期
   * @returns 导入数量
   */
  @Post('/bulk-create')
  async bulkCreate(@BodyParam('date') date: string): Promise<Record<string, number>> {
    // eslint-disable-next-line no-param-reassign
    date = dateFormat(date, 'yyyyMMdd');
    const res: Record<string, number> = await CustomGapService.bulkCreate(date);
    return res;
  }

  /**
   * 更新每日缺口
   * @param params
   * @returns 导入数量
   */
  @Post('/update')
  async update(@BodyParam('params') params: Record<string, any>): Promise<any> {
    const res: Record<string, number> = await CustomGapService.update(params);
    return res;
  }

  /**
   * 删除缺口数据
   * @returns 提示信息
   */
  @Delete('/destroy')
  async destroy(@BodyParam('tsCode') tsCode: string): Promise<string> {
    const res: string = await CustomGapService.destroy(tsCode);
    return res;
  }

  /**
   * 查询缺口数据
   */
  @Get('/')
  async getGap(): Promise<Record<string, any>[]> {
    const res: Record<string, any>[] = await CustomGapService.getGap();
    return res;
  }
}
