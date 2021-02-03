import http from 'http';
import { MongoGateway } from '@/infra/gateways/mongo';
import { ServerProtocol } from '../protocols/server';
import { ExpressServer } from '../config/express-server';

export class ServerFactory {
  static makeExpressServer(): ServerProtocol<http.Server> {
    const DBGateway = new MongoGateway('mongodb://localhost:27017');

    return new ExpressServer(DBGateway);
  }
}
