import express, { Request, Response, NextFunction } from "express";
import { RESTServerRoute, ServerAction } from '../../../../../../../types/Server';
import RouterUtils from '../../../../../../utils/RouterUtils';
import ExampleController from "../../../Controllers/ExampleController";

export default class ExampleRouter {
  private router: express.Router;

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRouteExampleGet();
    return this.router;
  }

  private buildRouteExampleGet(): void {
    this.router.get(`/${RESTServerRoute.EXAMPLE_GET}`, (req: Request, res: Response, next: NextFunction) => {
      void RouterUtils.handleRestServerAction(ExampleController.handleExampleGetReq.bind(this), ServerAction.EXAMPLE_GET, req, res, next);
    });
  }
}
