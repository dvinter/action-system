import { Message } from '@/domain/entities/message';
import { BadWordsAnalyzesProtocol } from './bad-words-analyzes';
import { ToneAnalyzesProtocol } from './tone-analyzes';

export interface AllAnalyzesProtocol {
  message: Message;
  badWordsAnalyzes: BadWordsAnalyzesProtocol;
  toneAnalyzes: ToneAnalyzesProtocol;
}
