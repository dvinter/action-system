import { Either } from '@/shared/result/either';
import { MessageDTO } from '../dtos/message';

export interface ToneAnalyzerServiceProtocol<L = any, R = any> {
  toneAnalyzer(message: any): Promise<Either<L, R>>;
}
