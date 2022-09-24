import { NextFunction, Request, Response } from 'express';
import { ServerAction } from '../../../../../../types/Server';
import moment from 'moment';

// Import DB instance....
import { db } from '../../../../../utils/Database/db.client';


const MODULE_NAME = 'ExampleController';

export default class ExampleController {

  public static async handleExampleGetReq(action: ServerAction, req: Request, res: Response, next: NextFunction): Promise<void> {


    /**
     *          
     *      DB query example...
     * 
     *      db.table_name.query_type({...options});
     *      
     *      for exmaple,
     *      db.users.findMany({
     *          select: {
     *              id: true, 
     *              email: true
     *          }
     *      });
     * 
     */



    const data = { 
        message: "Example Get Request"
    };

    res.status(200).json(data);
    next();
  }

}
