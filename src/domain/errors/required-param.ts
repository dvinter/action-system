export class RequiredParamError extends Error {
  private value: string;

  constructor(param: string) {
    super(`${param} is required`);

    this.value = `RequiredParamError ${param}`;
  }
}
