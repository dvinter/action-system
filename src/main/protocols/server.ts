import { ServerParamsDTO } from '@/main/dtos/server-params';

export interface ServerProtocol<T = any> {
  getInstance(): T;
  middlewares(): void;
  routes(): void;
  services(): void;
  start(params: ServerParamsDTO): void;
}
