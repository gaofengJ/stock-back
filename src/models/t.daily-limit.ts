import { DataTypes } from 'sequelize';
import mysql from '@/db/mysql';

const TDailyLimit = mysql.define('t_daily_limit', {
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
  // 交易日期
  tradeDate: {
    field: 'trade_date',
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  // 涨停价
  upLimit: {
    field: 'up_limit',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // 跌停价
  downLimit: {
    field: 'down_limit',
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default TDailyLimit;
