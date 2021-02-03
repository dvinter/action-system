import { Either } from '@/shared/result/either';

export interface AnalyzerRepositoryProtocol<L = any, R = any> {
  analyze(params: any): Promise<Either<L, R>>;
}
