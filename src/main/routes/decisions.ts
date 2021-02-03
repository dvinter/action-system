import { Router } from 'express';
import { PresentersFactory } from '@/main/factories/presenters';
import { ExpressRouterAdapter } from '@/main/adapters/express/router';

export default class DecisionsRouter {
  static execute(router: Router): void {
    router.post(
      '/decisions',
      ExpressRouterAdapter.execute(PresentersFactory.makeDecisionsPresenter())
    );
  }
}
