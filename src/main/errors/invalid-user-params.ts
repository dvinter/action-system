export class InvalidUserParamsError extends Error {
  private value: string;

  constructor() {
    super(`invalid user params`);

    this.value = 'InvalidUserParamsError';
  }
}
