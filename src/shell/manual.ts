import { dateFormat } from 'mufeng-tools';

import TTradeCalDao from '@/dao/curd/trade-cal';

// import shellDaily from './tushare/daily';
const { shellDailyLimit } = require('./tushare/daily-limit');
const { shellLimitList } = require('./tushare/limit-list');
const { shellDailyMarketMood } = require('./tushare/daily-market-mood');

const dateArgv = process.argv[2]; // node manual.js '2021-01-04'
if (!dateArgv) {
  console.log('请输入目标日期');
  return;
}
let _date = new Date(dateArgv);
_date = dateFormat(_date, 'yyyyMMdd');

async function tasks() {
  const isOpen = await TTradeCalDao.getIsOpen(_date);

  if (!isOpen) {
    console.log(`${_date}非交易日，请重新选择时间`);
    return;
  }

  // 涨跌停价
  await shellDailyLimit(_date);

  // 查询日线行情
  await shellDaily(_date);

  // 涨跌停统计
  await shellLimitList(_date);

  // 短线情绪
  await shellDailyMarketMood(_date);
}

tasks();
