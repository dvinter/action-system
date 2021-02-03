import { Document } from 'mongoose';
import { Either, left, right } from '@/shared/result/either';
import { SaveAnalyzesError } from '@/app/errors/save-analyzes';
import { IntelliboardRepositoryProtocol } from '@/app/protocols/intelliliboard-repository';
import { BlockUserRepositoryProtocol } from '@/app/protocols/block-user-repository';
import { MuteUserRepositoryProtocol } from '@/app/protocols/mute-user-repository';
import { AppRepositoryError } from '@/app/errors/app-repository';
import { ActionSystemServiceV3 } from './v3';
import { CreateRepositoryProtocol } from '@/app/protocols/create-repository';
import { Result } from '@/shared/result/result';

export class ActionSystemServiceV4
  extends ActionSystemServiceV3
  implements BlockUserRepositoryProtocol<string[], any> {
  constructor(
    intelliboardRepository: IntelliboardRepositoryProtocol,
    appRepository: BlockUserRepositoryProtocol & MuteUserRepositoryProtocol,
    dbAnalyzesRepository: CreateRepositoryProtocol<SaveAnalyzesError, Document>
  ) {
    super(intelliboardRepository, appRepository, dbAnalyzesRepository);
  }

  async blockUser(id: string | number): Promise<Either<string[], any>> {
    const appResponseOrError = await this.appRepository.blockUser(id);
    const intelliboardResponseOrError = await this.appRepository.blockUser(id);

    const result = Result.combine([
      appResponseOrError,
      intelliboardResponseOrError,
    ]);

    if (result?.isLeft()) return left(result?.value);

    return right(result);
  }
}
