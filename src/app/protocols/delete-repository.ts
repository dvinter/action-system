import { Either } from '@/shared/result/either';

export interface DeleteRepositoryProtocol<L = any, R = any> {
  delete(params: any): Promise<Either<L, R>>;
}
