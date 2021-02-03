import { AppRepositoryError } from '@/app/errors/app-repository';
import { ClientHttpPutProtocol } from '@/app/protocols/client-http-put';
import { MuteUserRepositoryProtocol } from '@/app/protocols/mute-user-repository';
import { Either, left, right } from '@/shared/result/either';

export class AppRepositoryV0 implements MuteUserRepositoryProtocol {
  protected clientHttp: ClientHttpPutProtocol<AppRepositoryError, any>;

  constructor(clientHttp: ClientHttpPutProtocol<AppRepositoryError, any>) {
    this.clientHttp = clientHttp;
  }

  async muteUser(id: string | number): Promise<Either<any, any>> {
    const response = await this.clientHttp.put(`/api/admin/mute-user/${id}`);

    if (response.isLeft()) return left(response.value);

    return right(response.value);
  }
}
