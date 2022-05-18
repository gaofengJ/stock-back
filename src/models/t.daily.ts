import { DataTypes } from 'sequelize';
import defineModel from './define-model';
import TStockBasic from './t.stock-basic';

// 每日统计
const TDaily = defineModel('t_daily', {
  // 股票代码
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '股票代码',
  },
  // 交易日期
  tradeDate: {
    field: 'trade_date',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '交易日期',
  },
  // 涨停价
  upLimit: {
    field: 'up_limit',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '涨停价',
  },
  // 跌停价
  downLimit: {
    field: 'down_limit',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '跌停价',
  },
  // 开盘价
  open: {
    field: 'open',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '开盘价',
  },
  // 最高价
  high: {
    field: 'high',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '最高价',
  },
  // 最低价
  low: {
    field: 'low',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '最低价',
  },
  // 收盘价
  close: {
    field: 'close',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '收盘价',
  },
  // 昨收价
  preClose: {
    field: 'pre_close',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '昨收价',
  },
  // 涨跌额
  change: {
    field: 'change',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '涨跌额',
  },
  // 涨跌幅
  pctChg: {
    field: 'pct_chg',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '涨跌幅',
  },
  // 成交量（手）
  vol: {
    field: 'vol',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '成交量（手）',
  },
  // 成交额（千元）
  amount: {
    field: 'amount',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '成交额（千元）',
  },
  // 换手率
  turnoverRate: {
    field: 'turnover_rate',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '换手率',
  },
  // 换手率（自由流通股）
  turnoverRateF: {
    field: 'turnover_rate_f',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '换手率（自由流通股）',
  },
  // 量比
  volumeRatio: {
    field: 'volume_ratio',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '量比',
  },
  // 市盈率（总市值/总利润）
  pe: {
    field: 'pe',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '市盈率（总市值/总利润）',
  },
  // 市盈率（TTM）
  peTtm: {
    field: 'pe_ttm',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '市盈率（TTM）',
  },
  // 市净率（总市值/净资产）
  pb: {
    field: 'pb',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '市净率（总市值/净资产）',
  },
  // 市销率
  ps: {
    field: 'ps',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '市销率',
  },
  // 市销率（TTM）
  psTtm: {
    field: 'ps_ttm',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '市销率（TTM）',
  },
  // 股息率（%）
  dvRatio: {
    field: 'dv_ratio',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '股息率（%）',
  },
  // 股息率（TTM）（%）
  dvTtm: {
    field: 'dv_ttm',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '股息率（TTM）（%）',
  },
  // 总股本
  totalShare: {
    field: 'total_share',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '总股本',
  },
  // 流通股本
  floatShare: {
    field: 'float_share',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '流通股本',
  },
  // 自由流通股本
  freeShare: {
    field: 'free_share',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '自由流通股本',
  },
  // 总市值
  totalMv: {
    field: 'total_mv',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '总市值',
  },
  // 流通市值
  circMv: {
    field: 'circ_mv',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '流通市值',
  },
});

TStockBasic.hasMany(TDaily, {
  sourceKey: 'tsCode',
  foreignKey: 'tsCode',
  constraints: false,
});
TDaily.belongsTo(TStockBasic, {
  targetKey: 'tsCode',
  foreignKey: 'tsCode',
  constraints: false,
});

export default TDaily;
