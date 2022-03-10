import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

const TOKEN = '50c7adac6b4ce0baa49b97e946c27826f832d903aa055822b9bd0544';

const client = axios.create({
  method: 'post',
  baseURL: 'api.waditu.com',
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data) => JSON.stringify(Object.assign(data, {
      token: TOKEN,
    })),
  ],
});

const request = async (config: AxiosRequestConfig) => {
  const reponse = await client.request(config);
  // 业务
  return reponse;
};

export const dailyLimit = (date: string): AxiosPromise => request({
  data: {
    api_name: 'stk_limit',
    params: {
      trade_date: date,
    },
  },
});

export const daily = (date: string): AxiosPromise => request({
  data: {
    api_name: 'daily',
    params: {
      trade_date: date,
    },
  },
});

export const limitList = (date: string): AxiosPromise => request({
  data: {
    api_name: 'limit_list',
    params: {
      trade_date: date,
    },
  },
});

export const stockBasic = (exchange: string): AxiosPromise => request({
  data: {
    api_name: 'stock_basic',
    params: {
      exchange, // 交易所 SSE 上交所, SZSE 深交所
    },
  },
});

export const tradeCal = (year: string): AxiosPromise => request({
  data: {
    params: {
      exchange: 'SSE', // 交易所 SSE 上交所, SZSE 深交所, CFFEX 中金所, SHFE 上期所, CZCE 郑商所, DCE 大商所,I NE 上能源
      start_date: `${year}0101`,
      end_date: `${year}1231`,
      // is_open: 1 // 是否交易 '0'休市 '1'交易
    },
  },
});
