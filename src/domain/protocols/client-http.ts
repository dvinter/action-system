import { ClientHttpParamsProtocol } from './client-http-params';

export interface ClientHttpProtocol<T = any> {
  get(path: string, params: ClientHttpParamsProtocol): Promise<T>;
  post(path: string, params: ClientHttpParamsProtocol): Promise<T>;
  put(path: string, params: ClientHttpParamsProtocol): Promise<T>;
  delete(path: string, params: ClientHttpParamsProtocol): Promise<T>;
  patch(path: string, params: ClientHttpParamsProtocol): Promise<T>;
  options(path: string, params: ClientHttpParamsProtocol): Promise<T>;
}
