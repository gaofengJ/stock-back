import { DataTypes } from 'sequelize';
import mysql from '@/db/mysql';

// 每日涨停价、跌停价
const TDailyLimit = mysql.define('t_daily_limit', {
  // id
  id: {
    field: 'id',
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // 交易日期
  tradeDate: {
    field: 'trade_date',
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  // 股票代码
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  // 涨停价
  upLimit: {
    field: 'up_limit',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
  // 跌停价
  downLimit: {
    field: 'down_limit',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
  },
});

export default TDailyLimit;
