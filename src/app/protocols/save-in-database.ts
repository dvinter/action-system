import { Either } from '@/shared/result/either';

export interface SaveInDatabaseServiceProtocol<L = any, R = any> {
  saveInDatabase(params: any): Promise<Either<L, R>>;
}
