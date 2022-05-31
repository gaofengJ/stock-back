import schedule from 'node-schedule';

// 定义规则
const rule = new schedule.RecurrenceRule();

rule.second = [0, 10, 20, 30, 40, 50]; // 每隔 10 秒执行一次

const dailyImport = () => {
  console.log(111);
  schedule.scheduleJob(rule, () => {
    console.log(new Date());
  });
};

export default () => {
  dailyImport();
};
