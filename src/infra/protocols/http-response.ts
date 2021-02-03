export interface HttpResponseProtocol<T = any> {
  status: number;
  data: T;
}
