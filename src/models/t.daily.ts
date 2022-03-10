import { DataTypes } from 'sequelize';
import mysql from '@/db/mysql';

const TDaily = mysql.define('t_daily', {
  // id
  id: {
    field: 'id',
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // 股票代码
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  // 股票名称
  name: {
    field: 'name',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  // 交易日期
  tradeDate: {
    field: 'trade_date',
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  // 开盘价
  open: {
    field: 'open',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 最高价
  high: {
    field: 'high',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 最低价
  low: {
    field: 'low',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 收盘价
  close: {
    field: 'close',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 昨收价
  preClose: {
    field: 'pre_close',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 涨跌额
  change: {
    field: 'change',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 涨跌幅
  pctChange: {
    field: 'pct_chg',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 成交量（手）
  vol: {
    field: 'vol',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 成交额（千元）
  amount: {
    field: 'amount',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default TDaily;
