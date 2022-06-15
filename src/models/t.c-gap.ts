import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 向上缺口数据
const TCGap = defineModel('t_c_gap', {
  // 股票代码
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '股票代码',
  },
  // 添加日期
  addDate: {
    field: 'add_date',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '添加日期',
  },
  // 移除日期
  removeDate: {
    field: 'remove_date',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '移除日期',
  },
  // 缺口下限
  gapLow: {
    field: 'gap_low',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '缺口下限',
  },
  // 缺口上限
  gapUp: {
    field: 'gap_up',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '缺口上限',
  },
  // 缺口状态(0: 封闭，1：打开)
  status: {
    field: 'status',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '缺口状态(0: 封闭，1：打开)',
  },
});

export default TCGap;
