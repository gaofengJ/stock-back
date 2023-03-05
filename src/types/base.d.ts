export interface ITuShareRes {
  code: number,
  msg?: string,
  data: any,
}
export interface IList<T> {
  total: number,
  list: T[]
}
