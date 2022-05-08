import { DataTypes } from 'sequelize';
import defineModel from './define-model';
import TStockBasic from './t.stock-basic';

// 每日统计
const TDaily = defineModel('t_daily', {
  // 交易日期
  tradeDate: {
    field: 'trade_date',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '交易日期',
  },
  // 股票代码
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '股票代码',
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
