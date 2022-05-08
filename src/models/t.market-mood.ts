import { DataTypes } from 'sequelize';
import defineModel from './define-model';

// 短线情绪指标
const TMarketMood = defineModel('t_market_mood', {
  // 日期
  tradeDate: {
    field: 'trade_date',
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: '日期',
  },
  // 2020年7月7日涨停，非一字涨停，非ST
  a: {
    field: 'a',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '2020年7月7日涨停，非一字涨停，非ST',
  },
  // 2020年7月6日涨停，非一字涨停，非ST
  b: {
    field: 'b',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '2020年7月6日涨停，非一字涨停，非ST',
  },
  // 2020年7月6日涨停，非一字涨停，非ST，2020年7月7日高开
  c: {
    field: 'c',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '2020年7月6日涨停，非一字涨停，非ST，2020年7月7日高开',
  },
  // 2020年7月6日涨停，非一字涨停，非ST，2020年7月7日上涨
  d: {
    field: 'd',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '2020年7月6日涨停，非一字涨停，非ST，2020年7月7日上涨',
  },
  // 2020年7月7日曾涨停，非ST
  e: {
    field: 'e',
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '2020年7月7日曾涨停，非ST',
  },
  // 非一字涨停
  sentimentA: {
    field: 'sentiment_a',
    type: DataTypes.FLOAT(16, 0),
    allowNull: false,
    comment: '非一字涨停',
  },
  // 打板高开率
  sentimentB: {
    field: 'sentiment_b',
    type: DataTypes.FLOAT(16, 0),
    allowNull: false,
    comment: '打板高开率',
  },
  // 打板成功率
  sentimentC: {
    field: 'sentiment_c',
    type: DataTypes.FLOAT(16, 0),
    allowNull: false,
    comment: '打板成功率',
  },
  // 打板被砸率
  sentimentD: {
    field: 'sentiment_d',
    type: DataTypes.FLOAT(16, 0),
    allowNull: false,
    comment: '打板被砸率',
  },
});

export default TMarketMood;
