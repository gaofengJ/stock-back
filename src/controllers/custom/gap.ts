import {
  JsonController,
  Post,
  BodyParam,
  Delete,
  Get,
} from 'routing-controllers';
import { dateFormat } from 'mufeng-tools';
import CustomGapService from '@/services/custom/gap';
import type { IGapCreateRet } from '@/types/gap';

/**
 * 需求
 * 一、每天新增出前两个交易日有缺口且未回补的的股票，列入股票池（无需建表）
 * 二、每天剔除缺口被回补的股票 done
 * 三、统计这些股票加入表中五日内的累计涨幅，累计涨幅等
 * 需要更新的字段 gapDays，gapPctChg1，gapPctChg2，gapPctChg3，gapPctChg4，gapPctChg5，gapPctChg
 */
@JsonController('/custom/gap')
export default class CustomGapController {
  /**
   * 每日缺口数据导入
   * @param date 日期
   * @returns 导入数量
   */
  @Post('/bulk-import')
  async bulkCreate(@BodyParam('date') date: string): Promise<IGapCreateRet> {
    date = dateFormat(date, 'yyyyMMdd');
    const ret: IGapCreateRet = await CustomGapService.bulkImport(date);
    return ret;
  }

  /**
   * 清空缺口信息表
   * @returns 提示信息
   */
  @Delete('/truncate-destroy')
  async truncateDestroy(): Promise<string> {
    const ret: string = await CustomGapService.truncateDestroy();
    return ret;
  }

  /**
   * 查询缺口数据
   */
  @Get('/')
  async getGap(): Promise<Record<string, any>[]> {
    const ret: Record<string, any>[] = await CustomGapService.getGap();
    return ret;
  }
}
