import { Either } from '@/shared/result/either';

export interface MakeDecisionsServiceProtocol<L = any, R = any> {
  makeDecisions(params: any): Promise<Either<L, R>>;
}
