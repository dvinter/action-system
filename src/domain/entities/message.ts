import { Either, left, right } from '@/shared/result/either';
import { VerySmallMessageError } from '@/domain/errors/very-small-message';
import { Mom } from './mom';
import { Result } from '@/shared/result/result';
import { RequiredParamError } from '@/domain/errors/required-param';
import { MessageContent } from './message-content';

export class Message {
  public readonly content!: MessageContent;
  public readonly from!: Mom;

  private constructor(params: Message) {
    Object.assign(this, params);
  }

  static create(message: Message): Either<string[], Message> {
    const messageOrError = Message.validate(message);

    if (messageOrError.isLeft()) return left(messageOrError.value);

    return right(new Message(message));
  }

  static validate(message: Message): Either<string[], string> {
    const contentOrError = MessageContent.create(message.content.text);
    const momOrError = Mom.create(message.from);

    const result = Result.combine([contentOrError, momOrError]);

    if (result.isLeft()) return left(result.value);

    return right(result.value);
  }
}
