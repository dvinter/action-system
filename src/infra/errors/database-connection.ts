export class DatabaseConnectionError extends Error {
  private value: string;

  constructor() {
    super('database connection error');

    this.value = 'DatabaseConnectionError';
  }
}
