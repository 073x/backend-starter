
import express, { Application, Request, Response, NextFunction } from "express";
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import { createServer, Server as HTTPServer } from "http";
import GlobalRouterV1 from "./v1/Routes/GlobalRouterV1";
import helmet from 'helmet';
import sanitize from 'express-sanitizer';
import useragent from 'express-useragent';
import hpp from 'hpp';
import Utils from "../../utils/Utils";
import morgan from 'morgan';

const MODULE_NAME = 'RestServer';

export default class RestServer {
    private expressApplication: Application;
    private restHTTPServer: HTTPServer;


    public constructor(){
        this.expressApplication = express();
        this.restHTTPServer = createServer(this.expressApplication);

        this.setMiddlewares();
        this.config();
        this.setRoutes();
        this.setCustomRouteHandlers();
    }

    public getExpressApplication = (): Application => this.expressApplication;

    public getRestHTTPServer = (): HTTPServer => this.restHTTPServer;


    private config(): void {

    }

    private setMiddlewares(debug=false): void {
        // Secure the application
        this.expressApplication.use(helmet());
        // Cross origin headers
        this.expressApplication.use(cors());

        this.expressApplication.use(useragent.express());
        if (debug || Utils.isDevelopmentEnv()) {
          this.expressApplication.use(morgan((tokens, req: Request, res: Response) =>
            [
              tokens.method(req, res),
              tokens.url(req, res), '-',
              tokens.status(req, res), '-',
              tokens['response-time'](req, res) + 'ms', '-',
              tokens.res(req, res, 'content-length') / 1024 + 'Kb',
            ].join(' ')
          ));
        }
        // Mount express-sanitizer middleware
        this.expressApplication.use(sanitize());
        this.expressApplication.use(hpp());

        this.expressApplication.use(cors());
        this.expressApplication.use(logger('dev'));
        this.expressApplication.use(express.json());
        this.expressApplication.use(express.urlencoded({ extended: true }));
        this.expressApplication.use(
                '/static',
                express.static(path.join(__dirname, '../public')),
        );
    }

    private setRoutes(): void {
        this.expressApplication.use('/v1', new GlobalRouterV1().buildRoutes());
    }

    private setCustomRouteHandlers(): void {
        this.expressApplication.use((err, req: Request, res: Response, next: NextFunction) => {
            return res.status(err?.statusCode ?? 500).json({
                status: {
                    code: err?.statusCode ?? 500,
                    success: Boolean(err?.status) ?? false
                },
                tag: err?.tag,
                message: err?.message,
                data: null,
                errors: err?.errors,
                cause: err?.cause
            });
        });
        
    }

    public startServer(): HTTPServer {
        const PORT = process.env.REST_HTTP_SERVICE_PORT || 9000;
        this.restHTTPServer.listen(PORT, () => {
            console.log(`\nENV_MODE : ${process.env.ENV_MODE}\n\nNODE APPLICATION IS RUNNING ON PORT ${PORT}`);
        });
        return this.getRestHTTPServer();
    }
}