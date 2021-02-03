import { AllAnalyzesDTO } from '@/app/dtos/all-analyzes';
import { AllAnalyzesProtocol } from '@/app/protocols/all-analyzes';
import { IntelliboardRepositoryProtocol } from '@/app/protocols/intelliliboard-repository';
import { Either, left, right } from '@/shared/result/either';
import { ActionSystemServiceV0 } from './v0';

export class ActionSystemServiceV1 extends ActionSystemServiceV0 {
  protected intelliboardRepository: IntelliboardRepositoryProtocol;

  constructor(intelliboardRepository: IntelliboardRepositoryProtocol) {
    super();
    this.intelliboardRepository = intelliboardRepository;
  }

  async sendToIntellilogs(
    analyzes: AllAnalyzesDTO
  ): Promise<Either<string[], AllAnalyzesProtocol>> {
    const response = await this.intelliboardRepository.sendToIntellilogs(
      analyzes
    );

    if (!response) return left(response);

    return right(analyzes);
  }
}
