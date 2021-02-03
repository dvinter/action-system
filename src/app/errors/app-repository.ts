export class AppRepositoryError extends Error {
  private value: string;

  constructor() {
    super(`app repository error`);

    this.value = `AppRepositoryError`;
  }
}
