require('dotenv').config();
import RestServer from "./server/rest/RestServer";

const MODULE_NAME = 'Bootst rap';

export default class Bootstrap {
    private restHTTPServer: RestServer;
    
    public static async start(): Promise<void> {
        const instance = new Bootstrap();

        // Starting HTTP Rest Server.
        instance.restHTTPServer = await instance.initializeHTTPRestServer();
    }

    private async initializeHTTPRestServer(): Promise<RestServer> {
        const restServer = new RestServer();
        restServer.startServer();
        return restServer;
    }
}


Bootstrap.start();