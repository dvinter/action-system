export class InvalidServerAdapterError extends Error {
  private value: string;

  constructor(value: string) {
    super(`invalid server adapter [${value}]`);

    this.value = 'InvalidServerAdapterError';
  }
}
