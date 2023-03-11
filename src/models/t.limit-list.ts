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
  // 所属行业
  industry: {
    field: 'industry',
    type: DataTypes.STRING(64),
    allowNull: true,
    comment: '所属行业',
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
  // 成交额（千元）
  amount: {
    field: 'amount',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '成交额（千元）',
  },
  // 板上成交额（千元）
  limitAmount: {
    field: 'limit_amount',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '板上成交额（千元）',
  },
  // 流通市值
  floatMv: {
    field: 'float_mv',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '流通市值',
  },
  // 总市值
  totalMv: {
    field: 'total_mv',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '总市值',
  },
  // 换手率
  turnoverRatio: {
    field: 'turnover_ratio',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '换手率',
  },
  // 封单金额
  fdAmount: {
    field: 'fd_amount',
    type: DataTypes.FLOAT(16, 2),
    allowNull: true,
    comment: '封单金额',
  },
  // 首次封板时间
  firstTime: {
    field: 'first_time',
    type: DataTypes.STRING(16),
    allowNull: true,
    comment: '首次封板时间',
  },
  // 最后封板时间
  lastTime: {
    field: 'last_time',
    type: DataTypes.STRING(16),
    allowNull: true,
    comment: '最后封板时间',
  },
  // 打开次数
  openTimes: {
    field: 'open_times',
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '打开次数',
  },
  // 涨停统计
  upStat: {
    field: 'up_stat',
    type: DataTypes.STRING(16),
    allowNull: true,
    comment: '涨停统计（N/T T天有N次涨停）',
  },
  // 连板数
  limitTimes: {
    field: 'limit_times',
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '连板数',
  },
  // D跌停，U涨停
  limit: {
    field: 'limit',
    type: DataTypes.STRING(1),
    allowNull: true,
    comment: 'D跌停，U涨停，Z炸板',
  },
});

export default TLimitList;
