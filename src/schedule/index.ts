import schedule from 'node-schedule';
import { dateFormat } from 'mufeng-tools';
import CurdManualService from '@/services/curd/manual';

// 定义规则
const rule = new schedule.RecurrenceRule();

rule.dayOfWeek = [1, 2, 3, 4, 5]; // 每周一到周五执行
rule.hour = 19;
rule.minute = 20;
rule.second = 0;

/**
 * 导入每日数据
 */
const dailyImport = () => {
  console.info('定时任务-导入每日数据启动');
  schedule.scheduleJob(rule, async () => {
    console.info(`定时任务-导入每日数据开始，导入日期：${dateFormat(new Date(), 'yyyyMMdd')}`);

    const date: string = dateFormat(new Date(), 'yyyyMMdd');
    await CurdManualService.manualImport(date);
    console.info(`定时任务-导入每日数据结束，导入日期：${dateFormat(new Date(), 'yyyyMMdd')}`);
  });
};

export default () => {
  dailyImport();
};
