import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 交易日期
const TTradeCal = defineModel('t_trade_cal', {
  // 日期
  calDate: {
    field: 'cal_date',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '日期',
  },
  // 是否为交易日期
  isOpen: {
    field: 'is_open',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '是否为交易日期',
  },
  // 日期
  preTradeDate: {
    field: 'pre_trade_date',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '日期',
  },
});

export default TTradeCal;
