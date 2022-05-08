import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 股票基本信息
const TStockBasic = defineModel('t_stock_basic', {
  // 股票代码（包含交易所）
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(16),
    allowNull: false,
    unique: true,
    comment: '股票代码（包含交易所）',
  },
  // 股票代码
  symbol: {
    field: 'symbol',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '股票代码',
  },
  // 股票名称
  name: {
    field: 'name',
    type: DataTypes.STRING(16),
    // allowNull: false, // 可能存在name为空的情况
    comment: '股票名称',
  },
  // 所在区域
  area: {
    field: 'area',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '所在区域',
  },
  // 所在行业
  industry: {
    field: 'industry',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '所在行业',
  },
  // 市场类型（主板/中小板/创业板/科创板/CDR）
  market: {
    field: 'market',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '市场类型（主板/中小板/创业板/科创板/CDR）',
  },
  // 上市时间
  listDate: {
    field: 'list_date',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '上市时间',
  },
});

export default TStockBasic;
