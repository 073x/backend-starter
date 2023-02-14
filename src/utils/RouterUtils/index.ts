import { NextFunction, Request, Response } from 'express';
import Constants from '../Constants';
import { ServerAction } from '../../../types/Server';
import Utils from '../Utils';

export default class RouterUtils {
  public static async handleRestServerAction(
      handleMethod: (serverAction: ServerAction, req: Request, res: Response, next: NextFunction) => Promise<void>,
      serverAction: ServerAction, req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Trace Request
    //   await Logging.traceExpressRequest(req, res, next, serverAction);
      // Process
      await handleMethod(serverAction, req, res, next);
      // Trace Response
    //   Logging.traceExpressResponse(req, res, next, serverAction);
    } catch (error) {
      next(error);
      Utils.isDevelopmentEnv() // && Logging.logConsoleError(error.stack);
    }
  }
}
