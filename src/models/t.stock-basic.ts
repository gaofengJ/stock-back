import { DataTypes } from 'sequelize';
import mysql from '@/db/mysql';

// 股票基本信息
const TStockBasic = mysql.define('t_stock_basic', {
  // 主键
  id: {
    field: 'id',
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    // autoIncrement: true,
  },
  // 股票代码（包含交易所）
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  // 股票代码
  symbol: {
    field: 'symbol',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  // 股票名称
  name: {
    field: 'name',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  // 所在区域
  area: {
    field: 'area',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  // 所在行业
  industry: {
    field: 'industry',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  // 市场类型（主板/中小板/创业板/科创板/CDR）
  market: {
    field: 'market',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  // 上市时间
  listDate: {
    field: 'list_date',
    type: DataTypes.STRING(16),
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default TStockBasic;
