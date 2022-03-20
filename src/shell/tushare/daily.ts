import { v4 } from 'uuid';
import { getType } from 'mufeng-tools';
import { daily } from '@/api/tushare/index';

const dateArgv = process.argv[2]; // node daily.js '2021-01-04'
let date = dateArgv ? new Date(dateArgv) : new Date(); // 如果命令行中没有加日期，就使用当天日期
date = getType(date, 'yyyyMMdd');
