import { Either } from '@/shared/result/either';
import { ClientHttpParamsProtocol } from './client-http-params';

export interface ClientHttpDeleteProtocol<L = any, R = any> {
  delete(
    path: string,
    params?: ClientHttpParamsProtocol,
    callback?: Function
  ): Promise<Either<L, R>>;
}
