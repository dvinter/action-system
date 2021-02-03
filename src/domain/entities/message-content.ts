import { Either, left, right } from '@/shared/result/either';
import { RequiredParamError } from '@/domain/errors/required-param';
import { VerySmallMessageError } from '../errors/very-small-message';

export class MessageContent {
  public text!: string;

  private constructor(params: MessageContent) {
    Object.assign(this, params);
  }

  static create(
    content: string
  ): Either<RequiredParamError | VerySmallMessageError, MessageContent> {
    const textOrError = MessageContent.validate(content);

    if (textOrError.isLeft()) return left(textOrError.value);

    return right(new MessageContent({ text: textOrError.value }));
  }

  static validate(
    content: string
  ): Either<VerySmallMessageError | RequiredParamError, string> {
    const words = content?.split(' ');
    const haveMoreThanTwoWords = words?.length > 2;

    if (!content) return left(new RequiredParamError('message content text'));

    if (!haveMoreThanTwoWords) return left(new VerySmallMessageError(content));

    return right(content);
  }
}
