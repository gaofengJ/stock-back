import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 每日涨停、跌停个股统计
const TLimitList = defineModel('t_limit_list', {
  // 股票代码
  tsCode: {
    field: 'ts_code',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '股票代码',
  },
  // 交易日期
  tradeDate: {
    field: 'trade_date',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '交易日期',
  },
  // 股票名称
  name: {
    field: 'name',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '股票名称',
  },
  // 收盘价
  close: {
    field: 'close',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '收盘价',
  },
  // 涨跌幅
  pctChg: {
    field: 'pct_chg',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '涨跌幅',
  },
  // 振幅
  amp: {
    field: 'amp',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '振幅',
  },
  // 封单金额 / 日成交金额
  fcRatio: {
    field: 'fc_ratio',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '封单金额 / 日成交金额',
  },
  // 封单手数 / 流通股本
  flRatio: {
    field: 'fl_ratio',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '封单手数 / 流通股本',
  },
  // 封单金额
  fdAmount: {
    field: 'fd_amount',
    type: DataTypes.FLOAT(16, 2),
    allowNull: false,
    comment: '封单金额',
  },
  // 首次触板时间
  firstTime: {
    field: 'first_time',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '首次触板时间',
  },
  // 最后封板时间
  lastTime: {
    field: 'last_time',
    type: DataTypes.STRING(16),
    allowNull: false,
    comment: '最后封板时间',
  },
  // 打开次数
  openTimes: {
    field: 'open_times',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '打开次数',
  },
  // 涨跌停强度
  strth: {
    field: 'strth',
    type: DataTypes.FLOAT(16),
    allowNull: false,
    comment: '涨跌停强度',
  },
  // D跌停，U涨停
  limit: {
    field: 'limit',
    type: DataTypes.STRING(1),
    allowNull: false,
    comment: 'D跌停，U涨停',
  },
});

export default TLimitList;
