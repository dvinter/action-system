import { Either, left, right } from '@/shared/result/either';
import { AnalyzerRepositoryProtocol } from '@/app/protocols/analyzer-repository';
import { ToneAnalyzerServiceProtocol } from '@/app/protocols/tone-analyzer-service';
import { MessageDTO } from '@/app/dtos/message';
import { ToneAnalyzesProtocol } from '@/app/protocols/tone-analyzes';

export class ToneAnalyzerRepositoryV0 implements AnalyzerRepositoryProtocol {
  private toneAnalyzerDevice: ToneAnalyzerServiceProtocol;

  constructor(toneAnalyzerDevice: ToneAnalyzerServiceProtocol) {
    this.toneAnalyzerDevice = toneAnalyzerDevice;
  }

  async analyze(
    message: MessageDTO
  ): Promise<Either<string[], ToneAnalyzesProtocol>> {
    const analyzesOrError = await this.toneAnalyzerDevice?.toneAnalyzer({
      toneInput: { text: message.content.text },
      contentType: 'application/json',
    });

    if (analyzesOrError?.isLeft()) return left(analyzesOrError?.value);

    const analyzes = analyzesOrError?.value;

    return right({
      documentTone: {
        tones: analyzes['document_tone']['tones']?.map((tone) => ({
          score: tone?.['score'],
          toneId: tone?.['tone_id'],
          toneName: tone?.['tone_name'],
        })),
      },
      sentencesTone: analyzes['sentences_tone']?.map((sentence) => ({
        sentenceId: sentence?.['sentence_id'],
        text: sentence?.['text'],
        tones: sentence?.['tones'].map((tone) => ({
          score: tone?.['score'],
          toneId: tone?.['tone_id'],
          toneName: tone?.['tone_name'],
        })),
      })),
    });
  }
}
