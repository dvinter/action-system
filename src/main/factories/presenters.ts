import { AppRepositoryV1 } from '@/app/repositories/app/v1';
import { IntelliboardRepositoryV0 } from '@/app/repositories/intelliboard/v0';
import { MongoAnalyzesRepositoryV0 } from '@/app/repositories/mongo-analyzes/v0';
import { ActionSystemServiceV4 } from '@/app/services/action-system/v4';
import { NodeFetchClientHttpDevice } from '@/infra/devices/node-fetch/client-http';
import { ActionSystemPresenterV0 } from '@/infra/presenters/action-system/v0';
import { EnvNotFoundError } from '@/shared/errors/env-not-found';
import { Result } from '@/shared/result/result';
import { Env } from '@/shared/utils/env';
import { Logger } from '@/shared/utils/logger';

export class PresentersFactory {
  static makeDecisionsPresenter(): any {
    const intelliboardUrlOrError = Env.get('INTELLIBOARD_URL');
    const appUrlOrError = Env.get('APP_URL');

    const result = Result.combine([intelliboardUrlOrError, appUrlOrError]);

    if (result?.isLeft()) {
      return Logger.error(JSON.stringify(result?.value));
    }

    const [INTELLIBOARD_URL, APP_URL] = result?.value;

    const intelliboardClientHttpDevice = new NodeFetchClientHttpDevice({
      baseURL: INTELLIBOARD_URL,
    });
    const appClientHttpDevice = new NodeFetchClientHttpDevice({
      baseURL: APP_URL,
    });

    const intelliboardRepository = new IntelliboardRepositoryV0(
      intelliboardClientHttpDevice
    );
    const appRepository = new AppRepositoryV1(appClientHttpDevice);
    const dbAnalyzesRepository = new MongoAnalyzesRepositoryV0();

    const actionSystemService = new ActionSystemServiceV4(
      intelliboardRepository,
      appRepository,
      dbAnalyzesRepository
    );

    return new ActionSystemPresenterV0(actionSystemService);
  }
}
