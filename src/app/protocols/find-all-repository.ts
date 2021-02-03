import { Either } from '@/shared/result/either';

export interface FindAllRepositoryProtocol<L = any, R = any> {
  findAll(params: any): Promise<Either<L, R>>;
}
