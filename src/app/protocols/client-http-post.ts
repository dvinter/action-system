import { Either } from '@/shared/result/either';
import { ClientHttpParamsProtocol } from './client-http-params';

export interface ClientHttpPostProtocol<L = any, R = any> {
  post(
    path: string,
    body?: any,
    params?: ClientHttpParamsProtocol,
    callback?: Function
  ): Promise<Either<L, R>>;
}
