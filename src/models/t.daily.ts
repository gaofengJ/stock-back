import { DataTypes } from 'sequelize';
import mysql from '@/db/mysql';
import TDailyLimit from './t.daily-limit';
import TStockBasic from './t.stock-basic';

// 每日统计
const TDaily = mysql.define('t_daily', {
  // 主键
  id: {
    field: 'id',
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    // autoIncrement: true,
  },
  // 股票代码
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  // 交易日期
  tradeDate: {
    field: 'trade_date',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  // 开盘价
  open: {
    field: 'open',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // 最高价
  high: {
    field: 'high',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // 最低价
  low: {
    field: 'low',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // 收盘价
  close: {
    field: 'close',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // 昨收价
  preClose: {
    field: 'pre_close',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // 涨跌额
  change: {
    field: 'change',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // 涨跌幅
  pctChg: {
    field: 'pct_chg',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // 成交量（手）
  vol: {
    field: 'vol',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // 成交额（千元）
  amount: {
    field: 'amount',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
}, {
  timestamps: false,
});

TDailyLimit.hasMany(TDaily);
TDaily.belongsTo(TDailyLimit, {
  targetKey: 'tsCode',
  foreignKey: 'tsCode',
});

TStockBasic.hasMany(TDaily);
TDaily.belongsTo(TStockBasic, {
  targetKey: 'tsCode',
  foreignKey: 'tsCode',
});

export default TDaily;
