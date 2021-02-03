export class VerySmallMessageError extends Error {
  private value: string;

  constructor(value: string) {
    super(`message "${value}" is very small`);

    this.value = 'VerySmallMessageError';
  }
}
