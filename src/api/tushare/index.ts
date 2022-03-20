import Axios, { AxiosRequestConfig } from 'axios';
import { TUSHARE_CONF } from '../../../db.config';

/**
 * @description tushare接口调用
 */
const client = Axios.create({
  method: 'post',
  url: '/',
  baseURL: 'http://api.waditu.com',
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (body) => JSON.stringify(
      Object.assign(body, {
        token: TUSHARE_CONF.token,
      }),
    ),
  ],
  transformResponse: [
    (response) => (JSON.parse(response)),
  ],
});

const request = async (config: AxiosRequestConfig) => {
  const { data } = await client.request(config);
  // 业务

  // 这里request会返回一个对象 { status: 200, statusText: 'OK', headers: {}, config: {}, request, data: {} }
  return { // 不直接返回data是为了过滤request_id
    code: data.code,
    msg: !data.code ? 'success' : data.msg,
    data: data.data,
  };
};

/**
 * @description 涨停价、跌停价
 * @param date 日期
 * @returns AxiosPromise
 */
export const getDailyLimit = (date: string): Promise<Base.TypeRes> => request({
  data: {
    api_name: 'stk_limit',
    params: {
      trade_date: date,
    },
  },
});

/**
 * @description 每日统计
 * @param date 日期
 * @returns AxiosPromise
 */
export const getDaily = (date: string): Promise<Base.TypeRes> => request({
  data: {
    api_name: 'daily',
    params: {
      trade_date: date,
    },
  },
});

/**
 * @description 涨跌停统计
 * @param date 日期
 * @returns AxiosPromise
 */
export const getLimitList = (date: string): Promise<Base.TypeRes> => request({
  data: {
    api_name: 'limit_list',
    params: {
      trade_date: date,
    },
  },
});

/**
 * @description 股票基本信息
 * @param exchange 交易所
 * @returns AxiosPromise
 */
export const getStockBasic = (exchange: string): Promise<Base.TypeRes> => request({
  data: {
    api_name: 'stock_basic',
    params: {
      exchange, // 交易所 SSE 上交所, SZSE 深交所
    },
  },
});

/**
 * @description 交易日期
 * @param year 年份
 * @returns AxiosPromise
 */
export const getTradeCal = (year: string): Promise<Base.TypeRes> => request({
  data: {
    api_name: 'trade_cal',
    params: {
      exchange: 'SSE', // 交易所 SSE 上交所, SZSE 深交所, CFFEX 中金所, SHFE 上期所, CZCE 郑商所, DCE 大商所,I NE 上能源
      start_date: `${year}0101`,
      end_date: `${year}1231`,
      // is_open: 1 // 是否交易 '0'休市 '1'交易
    },
  },
});
