import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BadGatewayError } from '@libs/errors/bad-gateway';
import { GrpcBusinessError } from '@libs/errors/grpc-business';
import { GrpcInternalError } from '@libs/errors/grpc-internal';
import { GrpcNotFoundEntityError } from '@libs/errors/grpc-not-found-entity';
import { HttpBusinessError } from '@libs/errors/http-business';
import { HttpInternalError } from '@libs/errors/http-internal';
import { HttpNotFoundEntityError } from '@libs/errors/http-not-found-entity';

@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((error: any) => {
          // The error is in this solution
          if (!context.switchToHttp().getResponse().finished) return throwError(() => error);
          // Unknown error calling dependency
          if (!error.code) return throwError(() => new Error(`Unknown error type. Original error message: ${error.message}`));
          // GRPC error calling dependency
          else if ([1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].filter(i => i == error.code).length) {
            getGrpcError(error);
          }
          // HTTP error calling dependency
          else if (error instanceof AxiosError)
          {
            const response = error.response || {status:0, data: {}};
            const statusCode = response.status;
            const responseData = response.data;
            if (error.code == 'ECONNREFUSED') return throwError(() => new BadGatewayError(`CONNECTION_REFUSED trying to connect to HTTP server.`));
            getErrorByStatusCode(statusCode,responseData);
          }
          function getGrpcError(error){
            switch (error.code) {
              case 3: return throwError(() => new Error(`GRPC error with code ${error.code}. INVALID_ARGUMENT sended to gRPC server. This is a 'bad request' in gRPC server.`));
              case 5: return throwError(() => new GrpcNotFoundEntityError(`GRPC error with code ${error.code}. NOT_FOUND some requested entity in the gRPC server. This is a 'not found entity' in gRPC server.`));
              case 9: return throwError(() => new GrpcBusinessError(`GRPC error with code ${error.code}. FAILED_PRECONDITION in gRPC server. This is a 'business error' in gRPC server and returns some detail.`, error.message || 'Details not provided'));
              case 12: return throwError(() => new Error(`GRPC error with code ${error.code}. UNIMPLEMENTED operation in called gRPC service. This is a 'not found operation' in gRPC server.`));
              case 13: return throwError(() => new GrpcInternalError(`GRPC error with code ${error.code}. INTERNAL error in gRPC server. This is a 'internal server error' in gRPC server. This error code is reserved for serious errors.`));
              default: return throwError(() => new Error(`GRPC error. ${error.message}`));
            }
          }
          function getErrorByStatusCode(statusCode,responseData){
            switch (statusCode) {
              case 400: return throwError(() => new Error(`HTTP error with code ${statusCode}. BAD_REQUEST sended to HTTP server.`));
              case 404: return throwError(() => new HttpNotFoundEntityError(`HTTP error with code ${statusCode}. NOT_FOUND some requested resource in the HTTP server. This is a 'not found entity' or 'not found url path' in HTTP server.`));
              case 409: return throwError(() => new HttpBusinessError(`HTTP error with code ${statusCode}. CONFLICT in HTTP server. This is a 'business error' in HTTP server and returns some detail.`, responseData.conflictDetail || 'Details not provided'));
              case 500: return throwError(() => new HttpInternalError(`HTTP error with code ${statusCode}. INTERNAL error in HTTP server. This is the 'internal server error'. This error code is reserved for serious errors.`));
              default: return throwError(() => new Error(`HTTP error. ${error.message}`));
            }
          }
        })
      )
  }
}