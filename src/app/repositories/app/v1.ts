import { MessageDTO } from '@/app/dtos/message';
import { AppRepositoryError } from '@/app/errors/app-repository';
import { BlockUserRepositoryProtocol } from '@/app/protocols/block-user-repository';
import { ClientHttpPutProtocol } from '@/app/protocols/client-http-put';
import { Either, left, right } from '@/shared/result/either';
import { AppRepositoryV0 } from './v0';

export class AppRepositoryV1
  extends AppRepositoryV0
  implements BlockUserRepositoryProtocol {
  constructor(clientHttp: ClientHttpPutProtocol) {
    super(clientHttp);
  }

  async blockUser(id: string | number): Promise<Either<any, any>> {
    const response = await this.clientHttp.put(`/api/admin/block-user/${id}`);

    if (response.isLeft()) return left(new AppRepositoryError());

    return right(response.value);
  }
}
