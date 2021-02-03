import { Request, Response, NextFunction } from 'express';
import { PresenterProtocol } from '@/infra/protocols/presenter';

export class ExpressRouterAdapter {
  static execute(presenter: PresenterProtocol) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const response = await presenter.handle(req.body);

      return res.status(response.status).json(response.data);
    };
  }
}
