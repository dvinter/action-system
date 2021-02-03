import ToneAnalyzerV3 from 'ibm-watson/tone-analyzer/v3';
import { ToneAnalyzerServiceProtocol } from '@/app/protocols/tone-analyzer-service';
import { Either, left, right } from '@/shared/result/either';

export class IbmToneAnalyzerDevice implements ToneAnalyzerServiceProtocol {
  private instance: ToneAnalyzerV3;

  constructor(params: ToneAnalyzerV3.Options) {
    this.instance = new ToneAnalyzerV3(params);
  }

  async toneAnalyzer(
    params: ToneAnalyzerV3.ToneParams
  ): Promise<Either<string[], any>> {
    const analyzes = await this.instance.tone(params);

    if (analyzes.status !== 200)
      return left([`Error: ToneAnalyzerV3 ${analyzes.result}`]);

    return right(analyzes.result);
  }
}
