export interface BadWordsAnalyzesProtocol {
  isBad: boolean;
  censoredContent: string;
  badWordsList: string[];
  badWordsTotal: number;
}
