import { Either } from '@/shared/result/either';

export interface CensorMessageRepositoryProtocol<L = any, R = any> {
  censorMessage(censoredContent: string): Promise<Either<L, R>>;
}
