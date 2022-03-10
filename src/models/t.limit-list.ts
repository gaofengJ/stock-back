import { DataTypes } from 'sequelize';
import mysql from '@/db/mysql';

const TLimitList = mysql.define('t_limit_list', {
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
  // 收盘价
  close: {
    field: 'close',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 涨跌幅
  pctChange: {
    field: 'pct_chg',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 振幅
  amp: {
    field: 'amp',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 封单金额 / 日成交金额
  fcRatio: {
    field: 'fc_ratio',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 封单手数 / 流通股本
  flRatio: {
    field: 'fl_ratio',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 封单金额
  fdAmount: {
    field: 'fd_amount',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 首次涨停时间
  firstTime: {
    field: 'first_time',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 最后封板时间
  lastTime: {
    field: 'last_time',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 打开次数
  openTimes: {
    field: 'open_times',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 涨跌停强度
  strth: {
    field: 'open_times',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // D跌停U涨停
  limit: {
    field: 'limit',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default TLimitList;
