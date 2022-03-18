import { DataTypes } from 'sequelize';
import mysql from '@/db/mysql';

const TMarketMood = mysql.define('t_market_mood', {
  // 主键
  id: {
    field: 'id',
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // 日期
  date: {
    field: 'date',
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  // 2020年7月7日涨停，非一字涨停，非ST
  a: {
    field: 'a',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 2020年7月6日涨停，非一字涨停，非ST
  b: {
    field: 'b',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 2020年7月6日涨停，非一字涨停，非ST，2020年7月7日高开
  c: {
    field: 'c',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 2020年7月6日涨停，非一字涨停，非ST，2020年7月7日上涨
  d: {
    field: 'd',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 2020年7月7日曾涨停，非ST
  e: {
    field: 'e',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 非一字涨停
  sentiment_a: {
    field: 'sentiment_a',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 打板高开率
  sentiment_b: {
    field: 'sentiment_b',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 打板成功率
  sentiment_c: {
    field: 'sentiment_c',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 打板被砸率
  sentiment_d: {
    field: 'sentiment_d',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 上涨家数
  up: {
    field: 'up',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 下跌家数
  down: {
    field: 'down',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // 平盘家数
  zero: {
    field: 'zero',
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

export default TMarketMood;
