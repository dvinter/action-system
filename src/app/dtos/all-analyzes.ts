import { Message } from '@/domain/entities/message';
import { BadWordsAnalyzesProtocol } from '../protocols/bad-words-analyzes';
import { ToneAnalyzesProtocol } from '../protocols/tone-analyzes';

export interface AllAnalyzesDTO {
  message: Message;
  badWordsAnalyzes: BadWordsAnalyzesProtocol;
  toneAnalyzes: ToneAnalyzesProtocol;
}
