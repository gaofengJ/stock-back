export interface IDailyItem {
  tsCode: string;
  tradeDate: string;
  upLimit: number;
  downLimit: number;
  open: number;
  high: number;
  low: number;
  close: number;
  preClose: number;
  change: number;
  pctChg: number;
  vol: number;
  amount: number;
  turnoverRate?: number;
  turnoverRateF?: number;
  volumeRatio?: number;
  pe?: number;
  peTtm?: number;
  pb?: number;
  ps?: number;
  psTtm?: number;
  dvRatio?: number;
  dvTtm?: number;
  totalShare?: number;
  floatShare?: number;
  freeShare?: number;
  totalMv?: number;
  circMv?: number;
  't_stock_basic.name'?: string;
}