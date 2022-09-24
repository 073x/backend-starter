import AssetRouter from './api/ExampleRoute';
import express from 'express';
import ExampleRouter from './api/ExampleRoute';

export default class GlobalRouterV1 {
  private router: express.Router;

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRouteAuth();
    this.buildRouteAPI();
    this.buildRouteUtil();
    this.buildRouteDocs();
    return this.router;
  }

  protected buildRouteAuth(): void {
    // this.router.use('/auth', null);
  }

  protected buildRouteAPI(): void {
    this.router.use('/api',
      [
        new ExampleRouter().buildRoutes(),
      ]);
  }

  protected buildRouteUtil(): void {
    // this.router.use('/util', null);
  }

  protected buildRouteDocs(): void {
    // this.router.use('/docs', null);
  }
}
