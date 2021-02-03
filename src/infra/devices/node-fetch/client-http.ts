import fetch, { Response } from 'node-fetch';
import { ClientHttpDeleteProtocol } from '@/app/protocols/client-http-delete';
import { ClientHttpGetProtocol } from '@/app/protocols/client-http-get';
import { ClientHttpParamsProtocol } from '@/app/protocols/client-http-params';
import { ClientHttpPostProtocol } from '@/app/protocols/client-http-post';
import { ClientHttpPutProtocol } from '@/app/protocols/client-http-put';
import { ClientHttpDeviceParamsProtocol } from '@/infra/protocols/http-device-params';

import { Either, left, right } from '@/shared/result/either';
export class NodeFetchClientHttpDevice
  implements
    ClientHttpGetProtocol<Response>,
    ClientHttpPostProtocol<Response>,
    ClientHttpPutProtocol<Response>,
    ClientHttpDeleteProtocol<Response> {
  private params: ClientHttpDeviceParamsProtocol;

  constructor(params: ClientHttpDeviceParamsProtocol) {
    this.params = params;
  }

  async get(
    path: string,
    params?: ClientHttpParamsProtocol
  ): Promise<Either<Response, Response>> {
    const response = await fetch(`${this.params.baseURL}/${path}`, params);

    if (!response) return left(response);

    return right(response);
  }

  async post(
    path: string,
    body?: any,
    params?: ClientHttpParamsProtocol
  ): Promise<Either<Response, any>> {
    const response = await fetch(`${this.params.baseURL}/${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.params.headers,
    });

    if (!response) return left(response);

    const data = await response.json();

    return right(data);
  }

  async delete(
    path: string,
    params?: ClientHttpParamsProtocol
  ): Promise<Either<Response, Response>> {
    const response = await fetch(`${this.params.baseURL}/${path}`, params);

    if (!response) return left(response);

    return right(response);
  }

  async put(
    path: string,
    body?: any,
    params?: ClientHttpParamsProtocol
  ): Promise<Either<Response, Response>> {
    const response = await fetch(`${this.params.baseURL}/${path}`, body);

    if (!response) return left(response);

    return right(response);
  }
}
