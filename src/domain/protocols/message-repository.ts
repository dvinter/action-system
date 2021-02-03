import { AllAnalyzesDTO } from '@/app/dtos/all-analyzes';
import { Message } from '@/domain/entities/message';
import { Either } from '@/shared/result/either';

export interface MessageRepositoryProtocol {
  analyze(message: AllAnalyzesDTO): Promise<Either<Error, Message>>;
}
