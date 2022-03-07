import Axios, { AxiosRequestConfig } from 'axios';

const client = Axios.create({
  // 配置
});

export async function request(url: string, config?:AxiosRequestConfig) {
  const response = await client.request({ url, ...config });
  const result = response.data;
  // 业务
  return result;
}

export default client;
