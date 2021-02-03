import { ClientHttpDeleteProtocol } from '@/app/protocols/client-http-delete';
import { ClientHttpGetProtocol } from '@/app/protocols/client-http-get';
import { ClientHttpParamsProtocol } from '@/app/protocols/client-http-params';
import { ClientHttpPostProtocol } from '@/app/protocols/client-http-post';
import { ClientHttpPutProtocol } from '@/app/protocols/client-http-put';
import { ClientHttpDeviceParamsProtocol } from '@/infra/protocols/http-device-params';
import { Either, left, right } from '@/shared/result/either';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class AxiosClientHttpDevice
  implements
    ClientHttpGetProtocol<AxiosResponse>,
    ClientHttpPostProtocol<AxiosResponse>,
    ClientHttpPutProtocol<AxiosResponse>,
    ClientHttpDeleteProtocol<AxiosResponse> {
  private instance: AxiosInstance;

  constructor(params: ClientHttpDeviceParamsProtocol) {
    this.instance = axios.create({
      baseURL: params.baseURL,
      headers: params.headers,
    });
  }

  async get(
    path: string,
    params?: ClientHttpParamsProtocol
  ): Promise<Either<AxiosResponse, AxiosResponse>> {
    const response = await this.instance.get(path, params);

    if (!response?.data) return left(response.data);

    return right(response.data);
  }

  async post(
    path: string,
    body?: any,
    params?: ClientHttpParamsProtocol
  ): Promise<Either<AxiosResponse, AxiosResponse>> {
    const response = await this.instance.post(path, body, params);

    if (!response?.data) return left(response.data);

    return right(response.data);
  }

  async delete(
    path: string,
    params?: ClientHttpParamsProtocol
  ): Promise<Either<AxiosResponse, AxiosResponse>> {
    const response = await this.instance.delete(path, params);

    if (!response?.data) return left(response.data);

    return right(response.data);
  }

  async put(
    path: string,
    body?: any,
    params?: ClientHttpParamsProtocol
  ): Promise<Either<AxiosResponse, AxiosResponse>> {
    const response = await this.instance.put(path, body, params);

    if (!response?.data) return left(response.data);

    return right(response.data);
  }
}
