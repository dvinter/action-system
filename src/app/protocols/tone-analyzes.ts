interface TonesProtocol {
  score?: number;
  toneId?: number | string;
  toneName?: string;
}

interface DocumentToneProtocol {
  tones?: TonesProtocol[];
}

interface SentencesToneProtocol {
  sentenceId?: number | string;
  text?: string;
  tones?: TonesProtocol[];
}

export interface ToneAnalyzesProtocol {
  documentTone?: DocumentToneProtocol;
  sentencesTone?: SentencesToneProtocol[];
}
