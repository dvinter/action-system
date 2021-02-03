import { Either } from '@/shared/result/either';

export interface ServiceProtocol<L = any, R = any> {
  execute(params: any): Promise<Either<L, R>>;
}
