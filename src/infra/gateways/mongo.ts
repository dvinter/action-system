import mongoose from 'mongoose';
import { Logger } from '@/shared/utils/logger';
import { DatabaseConnectionError } from '@/infra/errors/database-connection';
import { GatewayProtocol } from '@/infra/protocols/gateway';

export class MongoGateway implements GatewayProtocol {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async open(params: string): Promise<void> {
    try {
      const connectionString = `${this.url}${params}`;

      const { connection } = await mongoose.connect(`${this.url}${params}`, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });

      if (connection.readyState === 1) {
        Logger.success(`[MONGO CONNECTED] ${connectionString}`);
      } else {
        throw new DatabaseConnectionError();
      }
    } catch (error) {
      Logger.error(error.message);
    }
  }
}
