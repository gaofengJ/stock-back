// 批量导入缺口数据返回
export interface IGapCreateRet {
  addTotal: number;
  removeTotal: number;
  updateTotal: number;
}

export interface IGapItem {
  tsCode: string;
  addDate: string;
  removeDate: string;
  gapTurnoverRate?: number;
  gapTurnoverRateF?: number;
  gapVolumeRatio?: number;
  gapClose: number;
  gapLow: number;
  gapHigh: number;
  gapDays: number;
  gapPctChg0?: number;
  gapPctChg1?: number;
  gapPctChg2?: number;
  gapPctChg3?: number;
  gapPctChg4?: number;
  gapPctChg5?: number;
  gapPctChg: number;
  status: number;
}
