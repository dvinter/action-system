import { Document } from 'mongoose';
import { CreateRepositoryProtocol } from '@/app/protocols/create-repository';
import { Either, left, right } from '@/shared/result/either';
import { ActionSystemServiceV2 } from './v2';
import { AllAnalyzesDTO } from '@/app/dtos/all-analyzes';
import { SaveAnalyzesError } from '@/app/errors/save-analyzes';
import { IntelliboardRepositoryProtocol } from '@/app/protocols/intelliliboard-repository';
import { BlockUserRepositoryProtocol } from '@/app/protocols/block-user-repository';
import { MuteUserRepositoryProtocol } from '@/app/protocols/mute-user-repository';

export class ActionSystemServiceV3 extends ActionSystemServiceV2 {
  protected dbAnalyzesRepository: CreateRepositoryProtocol<
    SaveAnalyzesError,
    Document
  >;

  constructor(
    intelliboardRepository: IntelliboardRepositoryProtocol,
    appRepository: BlockUserRepositoryProtocol & MuteUserRepositoryProtocol,
    dbAnalyzesRepository: CreateRepositoryProtocol<SaveAnalyzesError, Document>
  ) {
    super(intelliboardRepository, appRepository);

    this.dbAnalyzesRepository = dbAnalyzesRepository;
  }

  async saveInDatabase(
    analyzes: AllAnalyzesDTO
  ): Promise<Either<SaveAnalyzesError, Document>> {
    const analyzesOrError = await this.dbAnalyzesRepository.create(analyzes);

    if (analyzesOrError.isLeft()) return left(analyzesOrError.value);

    return right(analyzesOrError.value);
  }
}
