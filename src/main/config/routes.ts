import { readdirSync } from 'fs';
import { Express, Router } from 'express';

export class RoutesConfig {
  static async init(app: Express) {
    const router = Router();
    app.use('/api', router);

    readdirSync(`${__dirname}/../routes`).map(async (route) => {
      (await import(`../routes/${route}`)).default.execute(router);
    });
  }
}
