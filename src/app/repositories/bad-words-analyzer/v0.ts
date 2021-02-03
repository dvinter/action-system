import Filter from 'bad-words';
import { Either, left, right } from '@/shared/result/either';
import { AnalyzerRepositoryProtocol } from '@/app/protocols/analyzer-repository';
import { Result } from '@/shared/result/result';
import { ClientHttpPostProtocol } from '@/app/protocols/client-http-post';
import { MessageDTO } from '@/app/dtos/message';
import { BadWordsAnalyzesProtocol } from '@/app/protocols/bad-words-analyzes';

export class BadWordsAnalyzerRepositoryV0
  implements AnalyzerRepositoryProtocol {
  private clientHttp: ClientHttpPostProtocol;
  private filter: Filter;

  constructor(clientHttp: ClientHttpPostProtocol) {
    this.clientHttp = clientHttp;
    this.filter = new Filter();
  }

  async analyze(
    message: MessageDTO
  ): Promise<Either<string[], BadWordsAnalyzesProtocol>> {
    const analyzesOrError = await this.clientHttp?.post?.('/bad-word-filter', {
      content: message.content,
    });

    if (analyzesOrError?.isLeft()) return left(analyzesOrError?.value);

    const analyzes = analyzesOrError?.value;

    return right({
      isBad: this.filter.isProfane(message.content.text),
      censoredContent: this.filter.clean(message.content.text),
      badWordsList: analyzes['bad-words-list'],
      badWordsTotal: analyzes['bad-words-total'],
    });
  }
}
