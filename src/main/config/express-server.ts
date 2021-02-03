import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';

import { ServerProtocol } from '@/main/protocols/server';
import { RoutesConfig } from './routes';
import { ServerParamsDTO } from '@/main/dtos/server-params';
import { GatewayProtocol } from '@/infra/protocols/gateway';
// import socketio from 'socket.io';

export class ExpressServer implements ServerProtocol<http.Server> {
  public app: Express;
  public server: http.Server;
  public DBGateway: GatewayProtocol;
  // public io: socketio.ExpressServer;

  constructor(DBGateway: GatewayProtocol) {
    this.app = express();
    this.server = http.createServer(this.app);
    // this.io = socketio(this.server);

    this.DBGateway = DBGateway;

    Object.freeze(this);
  }

  getInstance(): http.Server {
    return this.server;
  }

  middlewares(): void {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }

  routes(): void {
    RoutesConfig.init(this.app);
  }

  services(): void {}

  start(params: ServerParamsDTO): void {
    this.DBGateway.open('/latchaid');
    this.middlewares();
    this.services();
    this.routes();

    this.server.listen(params.port);
  }
}
