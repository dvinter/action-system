import { Either } from '@/shared/result/either';
import { MessageDTO } from '../dtos/message';
import { BadWordsAnalyzesProtocol } from './bad-words-analyzes';

export interface BadWordsAnalyzerServiceProtocol<L = any, R = any> {
  badWordsAnalyzer(message: MessageDTO): Promise<Either<L, R>>;
}
