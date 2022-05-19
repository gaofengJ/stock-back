const fs = require('fs');
const path = require('path');

const filePathMap: Record<string, string> = {
  dev: '../../../stock-db-config.json',
  prod: '../../../stock-db-config.json',
};

const {
  MYSQL_CONF: TEMP_MYSQL_CONF,
  REDIS_CONF: TEMP_REDIS_CONF,
  TUSHARE_CONF: TEMP_TUSHARE_CONF,
} = JSON.parse(fs.readFileSync(path.join(__dirname, filePathMap[process.env.NODE_ENV as string]), 'utf8'));

export const MYSQL_CONF = TEMP_MYSQL_CONF;
export const REDIS_CONF = TEMP_REDIS_CONF;
export const TUSHARE_CONF = TEMP_TUSHARE_CONF;
