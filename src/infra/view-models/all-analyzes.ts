import { BadWordsAnalyzesProtocol } from '@/app/protocols/bad-words-analyzes';
import { ToneAnalyzesProtocol } from '@/app/protocols/tone-analyzes';

export interface AllAnalyzesViewModel {
  badWordsAnalyzes: BadWordsAnalyzesProtocol;
  toneAnalyzes: ToneAnalyzesProtocol;
}
