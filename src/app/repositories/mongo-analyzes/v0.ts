import MongoActionSystemDecision from '@/domain/models/mongo/action-system-decision';
import { Document } from 'mongoose';
import { CreateRepositoryProtocol } from '@/app/protocols/create-repository';
import { Either, left, right } from '@/shared/result/either';
import { SaveAnalyzesError } from '@/app/errors/save-analyzes';
import { ActionSystemDecisionsProtocol } from '@/app/protocols/action-system-decision.ts';

export class MongoAnalyzesRepositoryV0
  implements CreateRepositoryProtocol<SaveAnalyzesError, Document> {
  async create(
    decisions: ActionSystemDecisionsProtocol
  ): Promise<Either<SaveAnalyzesError, Document>> {
    const mongoActionSystemDecision = new MongoActionSystemDecision(decisions);

    const result = await mongoActionSystemDecision.save();

    if (!result) return left(new SaveAnalyzesError(result));

    return right(result);
  }
}
