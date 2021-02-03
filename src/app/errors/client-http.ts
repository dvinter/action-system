export class ClientHttpError extends Error {
  private value: string;

  constructor() {
    super(`client http error`);

    this.value = `ClientHttpError`;
  }
}
