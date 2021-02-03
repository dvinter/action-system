import { Either } from '@/shared/result/either';

export interface BlockUserRepositoryProtocol<L = any, R = any> {
  blockUser(id: string | number): Promise<Either<L, R>>;
}
