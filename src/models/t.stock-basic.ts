import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 股票基本信息
const TStockBasic = defineModel('t_stock_basic', {
  // 股票代码（包含交易所）
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(16),
    allowNull: false,
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
  // 股票全称
  fullname: {
    field: 'fullname',
    type: DataTypes.STRING(256),
    allowNull: false,
    comment: '股票全称',
  },
  // 英文全称
  enname: {
    field: 'enname',
    type: DataTypes.STRING(256),
    allowNull: false,
    comment: '英文全称',
  },
  // 拼音缩写
  cnspell: {
    field: 'cnspell',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '拼音缩写',
  },
  // 市场类型（主板/中小板/创业板/科创板/CDR）
  market: {
    field: 'market',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '市场类型（主板/中小板/创业板/科创板/CDR）',
  },
  // 交易所代码
  exchange: {
    field: 'exchange',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '交易所代码',
  },
  // 交易货币
  currType: {
    field: 'curr_type',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '交易货币',
  },
  // 上市状态（L上市 D退市 P暂停上市）
  listStatus: {
    field: 'list_status',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '上市状态（L上市 D退市 P暂停上市）',
  },
  // 上市日期
  listDate: {
    field: 'list_date',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '上市日期',
  },
  // 退市日期
  delistDate: {
    field: 'delist_date',
    type: DataTypes.STRING(16),
    allowNull: true,
    comment: '退市日期',
  },
  // 是否沪深港通标的，N否 H沪股通 S深股通
  isHs: {
    field: 'is_hs',
    type: DataTypes.STRING(16),
    allowNull: true,
    comment: '是否沪深港通标的，N否 H沪股通 S深股通',
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['ts_code'],
    },
  ],
});

export default TStockBasic;
