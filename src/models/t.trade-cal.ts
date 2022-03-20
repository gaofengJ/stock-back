import { DataTypes } from 'sequelize';
import mysql from '@/db/mysql';

// 交易日期
const TTradeCal = mysql.define('t_trade_cal', {
  // 主键
  id: {
    field: 'id',
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // 日期
  calDate: {
    field: 'cal_date',
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  // 是否为交易日期
  isOpen: {
    field: 'is_open',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default TTradeCal;