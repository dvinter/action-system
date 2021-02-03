import { Either } from '@/shared/result/either';

export interface CreateRepositoryProtocol<L = any, R = any> {
  create(params: any): Promise<Either<L, R>>;
}
