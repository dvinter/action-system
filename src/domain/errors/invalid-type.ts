export class InvalidTypeError extends Error {
  private value: string;

  constructor(value: string) {
    super(`invalid type of ${value}`);

    this.value = 'InvalidTypeError';
  }
}
