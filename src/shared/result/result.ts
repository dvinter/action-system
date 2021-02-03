import { Either, left, right } from './either';

export class Result {
  static combine(params: Either<any, any>[]): Either<string[], any> {
    const result = Object.values(params).filter((param: any) => param.isLeft());

    if (result.length) {
      return left(result.map(({ value }: any) => value.message));
    }

    return right(params.map(({ value }: Either<any, any>) => value));
  }
}
