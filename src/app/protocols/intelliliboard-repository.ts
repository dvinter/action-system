import { Either } from '@/shared/result/either';

export interface IntelliboardRepositoryProtocol<L = any, R = any> {
  sendToIntellilogs(params: any): Promise<Either<L, R>>;
}
