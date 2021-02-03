import { Either, left, right } from '@/shared/result/either';
import { RequiredParamError } from '@/domain/errors/required-param';

export class Mom {
  public readonly id!: string | number;
  public name!: string;

  private constructor(params: Mom) {
    Object.assign(this, params);
  }

  static create(params: Mom): Either<RequiredParamError, Mom> {
    const momOrError = Mom.validate(params);

    if (momOrError.isLeft()) return left(momOrError.value);

    return right(new Mom(momOrError.value));
  }

  private static validate(params: Mom): Either<RequiredParamError, Mom> {
    if (!params?.id) return left(new RequiredParamError('message mom id'));

    if (!params?.name?.length)
      return left(new RequiredParamError('message mom name'));

    return right(params);
  }
}
