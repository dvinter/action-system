import { Either } from '@/shared/result/either';

export interface FindOneRepositoryProtocol<L = any, R = any> {
  findOne(params: any): Promise<Either<L, R>>;
}
