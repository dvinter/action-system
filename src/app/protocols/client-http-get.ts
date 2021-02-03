import { Either } from '@/shared/result/either';
import { ClientHttpParamsProtocol } from './client-http-params';

export interface ClientHttpGetProtocol<L = any, R = any> {
  get(
    path: string,
    params?: ClientHttpParamsProtocol,
    callback?: Function
  ): Promise<Either<L, R>>;
}
