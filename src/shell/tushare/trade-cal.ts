// import { v4 as uuidv4 } from 'uuid';

import { tradeCal } from '@/api/tushare/index';
// import { create } from '@/dao/curd/trade-cal';

export default async function shellTradeCal(year: string) {
  const res = await tradeCal(year);
  return res;
  // if (code) return;
  // const { fields, items } = data;

  // const sucCount = 0;
  // const errCount = 0;
  // if (!items[0]) return; // 如果没有数据就返回

  // for (const itemIdx in items) {
  //   const params = {};
  //   params.uuid = uuidv4();
  //   params.calDate = items[itemIdx][1];
  //   params.isOpen = items[itemIdx][2];
  //   const res = await insertRecord(params);
  //   if (res.affectedRows === 1) {
  //     sucCount++;
  //     console.log(`${_year}已导入${sucCount}条数据 日期：${params.calDate}`);
  //   } else {
  //     errCount++;
  //     console.log(`${_year}已有${errCount}条数据导入失败 日期：${params.calDate}`);
  //   }
  // }
}
