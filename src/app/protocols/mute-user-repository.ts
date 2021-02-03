import { Either } from '@/shared/result/either';

export interface MuteUserRepositoryProtocol<L = any, R = any> {
  muteUser(id: string | number): Promise<Either<L, R>>;
}
