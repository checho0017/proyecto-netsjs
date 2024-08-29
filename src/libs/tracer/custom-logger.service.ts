import { Injectable, Logger } from "@nestjs/common";
import { Request } from 'express';


@Injectable()
export class CustomLoggerService {
  private logger: Logger;
  private containerType: string;
  
  constructor() {
    this.logger = new Logger();
    this.containerType = 'Backend For Frontend';
  }

  log(message: string): void {
    const timestamp: number = Date.now();
    const log: string = JSON.stringify({
      logLevel: 'LOG',
      timestamp: timestamp,
      iso8601: new Date(timestamp).toISOString(),
      message,
      containerType: this.containerType,
    });
    this.logger.verbose(log);
  }
  
  error(type: string, message: string, trace: string, request: Request<any> | null): void {
    const timestamp: number = Date.now();
    const requestMethod: string = request === null ? 'NULL' : request.method;
    const requestUrlPath: string = request === null ? 'NULL' : request.url;
    const requestHost: string = request === null ? 'NULL' : request.hostname;
    const stackTrace = (trace) ? trace.replace(/\s(at)\s/g, '') : null;
    let requestBody: string = 'NULL';
    let requestHeaders: string = 'NULL';
    const log: string = JSON.stringify({
      logLevel: 'ERROR',
      timestamp: timestamp,
      iso8601: new Date(timestamp).toISOString(),
      type,
      message,
      containerType: this.containerType,
      processId: process.pid,
      requestMethod,
      requestUrlPath,
      requestHost,
      requestBody,
      requestHeaders,
      stackTrace,
    });
    this.logger.error(log);
  }

  trace(startTime: number, request: any): void {
    const timestamp: number = Date.now();
    const requestMethod: string = request === null ? 'NULL' : request.method;
    const requestUrlPath: string = request === null ? 'NULL' : request.url;
    const requestHost: string = request === null ? 'NULL' : request.hostname;
    const log: string = JSON.stringify({
      logLevel: 'TRACE',
      timestamp: timestamp,
      iso8601: new Date(timestamp).toISOString(),
      elapsedTime: `${timestamp-startTime}ms`,
      containerType: this.containerType,
      processId: process.pid,
      requestMethod,
      requestUrlPath,
      requestHost,
    });
    this.logger.log(log);
  }
}