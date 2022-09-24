
export enum ServerAction {
  EXAMPLE_GET = "examples_get"
}


// RESTful API
export enum RESTServerRoute {
  EXAMPLE_GET = "examples/get"
}

export enum OCPIServerRoute {
  OCPI_CREDENTIALS = 'credentials',
  OCPI_LOCATIONS = 'locations',
  OCPI_TOKENS = 'tokens',
  OCPI_SESSIONS = 'sessions',
  OCPI_CDRS = 'cdrs',
  OCPI_COMMANDS = 'commands',
  OCPI_TARIFFS = 'tariffs',
  OCPI_VERSIONS = 'versions',
}

export enum OCPIServerRouteVersions {
  VERSION_211 = '2.1.1'
}

export enum ServerProtocol {
  HTTP = 'http',
  HTTPS = 'https',
  WS = 'ws',
  WSS = 'wss'
}

export enum ServerType {
  REST_SERVER = 'Rest',
  SOAP_SERVER = 'Soap',
  JSON_SERVER = 'Json',
  OCPI_SERVER = 'Ocpi',
  OICP_SERVER = 'Oicp',
  ODATA_SERVER = 'OData',
  BATCH_SERVER = 'Batch',
  MONITORING_SERVER = 'Monitoring',
  CENTRAL_SERVER = 'CentralServer',
}

export enum WSServerProtocol {
  OCPP16 = 'ocpp1.6',
  REST = 'rest'
}
