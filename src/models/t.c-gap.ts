import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 向上缺口数据
const TCGap = defineModel('t_c_gap', {
  // 股票代码
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '股票代码',
  },
  // 添加日期
  addDate: {
    field: 'add_date',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '添加日期',
  },
  // 移除日期
  closeDate: {
    field: 'close_date',
    type: DataTypes.STRING(16),
    allowNull: true,
    comment: '移除日期',
  },
  // 缺口当天换手率
  gapTurnoverRate: {
    field: 'gap_turnover_rate',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '缺口当日换手率',
  },
  // 缺口当天实际换手率
  gapTurnoverRateF: {
    field: 'gap_turnover_rate_f',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '缺口当天实际换手率',
  },
  // 缺口当天量比
  gapVolumeRatio: {
    field: 'gap_volume_ratio',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '缺口当天量比',
  },
  // 缺口当日收盘价
  gapClose: {
    field: 'gap_close',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '缺口当日收盘价',
  },
  // 缺口下限
  gapLow: {
    field: 'gap_low',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '缺口下限',
  },
  // 缺口上限
  gapHigh: {
    field: 'gap_high',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '缺口上限',
  },
  // 添加天数
  gapDays: {
    field: 'gap_days',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '缺口添加天数',
  },
  // 0日涨幅
  gapPctChg0: {
    field: 'gap_pct_chg0',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '0日涨幅',
  },
  // 1日涨幅
  gapPctChg1: {
    field: 'gap_pct_chg1',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '1日涨幅',
  },
  // 2日涨幅
  gapPctChg2: {
    field: 'gap_pct_chg2',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '2日涨幅',
  },
  // 3日涨幅
  gapPctChg3: {
    field: 'gap_pct_chg3',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '3日涨幅',
  },
  // 4日涨幅
  gapPctChg4: {
    field: 'gap_pct_chg4',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '4日涨幅',
  },
  // 5日涨幅
  gapPctChg5: {
    field: 'gap_pct_chg5',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '5日涨幅',
  },
  // 累计涨幅（10日内）
  gapPctChg: {
    field: 'gap_pct_chg',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '缺口后累计涨幅（10日内）',
  },
  // 缺口状态(0: 封闭，1：打开)
  status: {
    field: 'status',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '缺口状态(0: 封闭，1：打开)',
  },
});

export default TCGap;
