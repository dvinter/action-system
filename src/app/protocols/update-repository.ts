import { Either } from '@/shared/result/either';

export interface UpdateRepositoryProtocol<L = any, R = any> {
  update(params: any): Promise<Either<L, R>>;
}
