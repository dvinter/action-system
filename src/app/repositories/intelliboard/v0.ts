import { ClientHttpPostProtocol } from '@/app/protocols/client-http-post';
import { IntelliboardRepositoryProtocol } from '@/app/protocols/intelliliboard-repository';
import { Either, left, right } from '@/shared/result/either';
import { Result } from '@/shared/result/result';

export class IntelliboardRepositoryV0
  implements IntelliboardRepositoryProtocol {
  private clientHttp: ClientHttpPostProtocol;

  constructor(clientHttp: ClientHttpPostProtocol) {
    this.clientHttp = clientHttp;
  }

  async sendToIntellilogs(params: any): Promise<Either<string[], any>> {
    const responseOrError = await this.clientHttp.post('/api/asa', {
      body: params,
    });

    const result = Result.combine([responseOrError]);

    if (result.isLeft()) return left(result.value);

    return right(responseOrError.value);
  }
}
