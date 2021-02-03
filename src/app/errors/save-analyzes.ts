export class SaveAnalyzesError extends Error {
  private value: string;

  constructor(value: string) {
    super(`save analyzes error ${value}`);

    this.value = `SaveAnalyzesError ${value}`;
  }
}
