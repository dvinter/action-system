import { AllAnalyzesDTO } from '@/app/dtos/all-analyzes';
import { AppRepositoryError } from '@/app/errors/app-repository';
import { ActionSystemDecisionsProtocol } from '@/app/protocols/action-system-decision.ts';
import { BlockUserRepositoryProtocol } from '@/app/protocols/block-user-repository';
import { IntelliboardRepositoryProtocol } from '@/app/protocols/intelliliboard-repository';
import { MuteUserRepositoryProtocol } from '@/app/protocols/mute-user-repository';
import { Either, left, right } from '@/shared/result/either';
import { ActionSystemServiceV1 } from './v1';

export class ActionSystemServiceV2
  extends ActionSystemServiceV1
  implements MuteUserRepositoryProtocol {
  protected appRepository: MuteUserRepositoryProtocol &
    BlockUserRepositoryProtocol;

  constructor(
    intelliboardRepository: IntelliboardRepositoryProtocol,
    appRepository: MuteUserRepositoryProtocol & BlockUserRepositoryProtocol
  ) {
    super(intelliboardRepository);

    this.appRepository = appRepository;
  }

  async muteUser(
    id: string | number
  ): Promise<Either<AppRepositoryError, any>> {
    const response = await this.appRepository.muteUser(id);

    if (response.isLeft()) return left(new AppRepositoryError());

    return right(response);
  }
}
