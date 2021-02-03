export class UserNotFoundError extends Error {
  private value: string;

  constructor() {
    super('user not found');
    this.value = 'UserNotFoundError';
  }
}
