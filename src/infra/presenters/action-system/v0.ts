import {
  badRequest,
  internalServerError,
  ok,
} from '@/infra/helpers/htt-response';
import { HttpResponseProtocol } from '@/infra/protocols/http-response';
import { PresenterProtocol } from '@/infra/protocols/presenter';
import { ActionSystemDecisionsProtocol } from '@/app/protocols/action-system-decision.ts';
import { AllAnalyzesViewModel } from '@/infra/view-models/all-analyzes';
import { MakeDecisionsServiceProtocol } from '@/app/protocols/make-decisions';
import { AllAnalyzesProtocol } from '@/app/protocols/all-analyzes';
import { BlockUserRepositoryProtocol } from '@/app/protocols/block-user-repository';
import { MuteUserRepositoryProtocol } from '@/app/protocols/mute-user-repository';
import { RequiredParamError } from '@/domain/errors/required-param';
import { IntelliboardRepositoryProtocol } from '@/app/protocols/intelliliboard-repository';
import { SaveInDatabaseServiceProtocol } from '@/app/protocols/save-in-database';

export class ActionSystemPresenterV0 implements PresenterProtocol {
  private actionSystemService: MakeDecisionsServiceProtocol<
    any,
    ActionSystemDecisionsProtocol
  > &
    BlockUserRepositoryProtocol &
    MuteUserRepositoryProtocol &
    IntelliboardRepositoryProtocol &
    SaveInDatabaseServiceProtocol;

  constructor(
    actionSystemService: MakeDecisionsServiceProtocol<
      any,
      ActionSystemDecisionsProtocol
    > &
      BlockUserRepositoryProtocol &
      MuteUserRepositoryProtocol &
      IntelliboardRepositoryProtocol &
      SaveInDatabaseServiceProtocol
  ) {
    this.actionSystemService = actionSystemService;
  }

  async handle(
    analyzes: AllAnalyzesProtocol
  ): Promise<HttpResponseProtocol<AllAnalyzesViewModel>> {
    try {
      const {
        message: { from },
      } = analyzes;

      const decisionsOrError = await this.actionSystemService.makeDecisions(
        analyzes
      );

      if (decisionsOrError?.isLeft()) {
        return badRequest(decisionsOrError?.value);
      }

      await this.actionSystemService.saveInDatabase(decisionsOrError.value);

      // const strategies = {
      //   block: (userId) => this.actionSystemService.blockUser(userId),
      //   mute: (userId) => this.actionSystemService.muteUser(userId),
      // };

      // const actions = decisionsOrError.value.actions;
      // const strategy = strategies[actions[0]];

      // if (!strategy) {
      //   return badRequest({
      //     message: new RequiredParamError(
      //       `message, badWordsAnalyzes and toneAnalyzes`
      //     ).message,
      //   });
      // }

      // TODO: descomentar quando existir os endpoints
      // await strategy(from.id);

      // await this.actionSystemService.sendToIntellilogs(analyzes);

      return ok(decisionsOrError?.value);
    } catch ({ message }) {
      return internalServerError({ message });
    }
  }
}
