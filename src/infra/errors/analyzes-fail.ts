export class AnalyzesFailError extends Error {
  private value: string;

  constructor() {
    super('analyzes fail error');

    this.value = 'AnalyzesFailError';
  }
}
