import { AllAnalyzesDTO } from '@/app/dtos/all-analyzes';
import { ActionSystemDecisionsProtocol } from '@/app/protocols/action-system-decision.ts';
import { EnvNotFoundError } from '@/shared/errors/env-not-found';
import { Either, left, right } from '@/shared/result/either';
import { Env } from '@/shared/utils/env';
import { SuperArray } from '@/shared/utils/super-array';

export class ActionSystemServiceV0 {
  constructor() {}

  async makeDecisions(
    analyzes: AllAnalyzesDTO = {
      message: { content: { text: '' }, from: { id: '', name: '' } },
      badWordsAnalyzes: {
        isBad: false,
        badWordsList: [],
        censoredContent: '',
        badWordsTotal: 0,
      },
      toneAnalyzes: { documentTone: { tones: [] }, sentencesTone: [] },
    }
  ): Promise<Either<EnvNotFoundError, ActionSystemDecisionsProtocol>> {
    const minimumConfidenceOrError = Env.get('MINIMUM_CONFIDENCE', true);

    if (minimumConfidenceOrError.isLeft())
      return left(minimumConfidenceOrError.value);

    const MINIMUM_CONFIDENCE = minimumConfidenceOrError.value;

    const {
      badWordsAnalyzes: { isBad, badWordsTotal },
      toneAnalyzes: { sentencesTone },
    } = analyzes;

    const haveMoreThanTwoBadWords = Number(badWordsTotal) > 2;
    const angerSentences = sentencesTone?.filter(({ tones }) => {
      return tones?.find(({ toneId, score }) => {
        return toneId == 'anger' && Number(score) > MINIMUM_CONFIDENCE;
      });
    });

    const availableActions = {
      block: [
        [true, true, true],
        [true, false, true],
        [true, true, false],
        [false, true, true],
      ],
      mute: [
        [true, false, false],
        [false, true, false],
        [false, false, true],
      ],
    };

    const actions: any = Object.keys(availableActions).filter((type) => {
      return (availableActions[type] as []).find((value) => {
        if (
          SuperArray.compare(value, [
            isBad,
            haveMoreThanTwoBadWords,
            !!angerSentences,
          ])
        ) {
          return type;
        }
      });
    });

    return right({ actions, analyzes });
  }
}
