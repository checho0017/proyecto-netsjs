import { ExceptionFilter, Catch, ArgumentsHost, HttpException, MethodNotAllowedException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { BadGatewayError } from '@libs/errors/bad-gateway';
import { GrpcBusinessError } from '@libs/errors/grpc-business';
import { GrpcInternalError } from '@libs/errors/grpc-internal';
import { GrpcNotFoundEntityError } from '@libs/errors/grpc-not-found-entity';
import { HttpBusinessError } from '@libs/errors/http-business';
import { HttpInternalError } from '@libs/errors/http-internal';
import { HttpNotFoundEntityError } from '@libs/errors/http-not-found-entity';
import { CustomLoggerService } from '@libs/tracer/custom-logger.service';

type ResponseObject = {
  statusCode: number,
  message: string,
  conflictDetail?: string,
}

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private logger: CustomLoggerService
  ) {}

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let exceptionType: string;
    let status: number;
    let responseMessage: string;
    let conflictDetail: string;
    let responseObject: ResponseObject;
    getExceptionType(exception);

    if (!responseMessage) {
      switch (status) {
        case 400 : responseMessage = 'Bad Request';
          break;
        case 404 : responseMessage = 'Not Found';
          break;
        case 500 : responseMessage = 'Internal Server Error';
          break;
        case 502 : responseMessage = 'Bad Gateway';
          break;
        default: responseMessage = `Http Error With Code ${status}`;
      } 
    }

    this.logger.error(exceptionType, exception.message, exception.stack, request);

    responseObject = (exception instanceof GrpcBusinessError || exception instanceof HttpBusinessError)
      ? {statusCode: status, message: responseMessage, conflictDetail}
      : {statusCode: status, message: responseMessage}

    response
      .status(status)
      .json(responseObject);

    function getExceptionType(exception) {
      switch (true) {
        case exception instanceof BadRequestException:
          exceptionType = BadRequestException.name;
          status = exception.getStatus();
          break;
        case exception instanceof HttpException:
          exceptionType = HttpException.name;
          status = exception.getStatus();
          break;
        case exception instanceof BadGatewayError:
          exceptionType = BadGatewayError.name;
          status = 502;
          break;
        case exception instanceof GrpcBusinessError :
          exceptionType = exception.constructor.name;
          status = 409;
          responseMessage = 'Business Error In Backend (Grpc)';
          conflictDetail = exception.detail;
          break;
        case exception instanceof HttpBusinessError:
          exceptionType = exception.constructor.name;
          status = 409;
          responseMessage = 'Business Error In Backend (Http)';
          conflictDetail = exception.detail;
          break;
        case exception instanceof GrpcNotFoundEntityError:
          exceptionType = exception.constructor.name;
          responseMessage = 'Resource Not Found In Backend (Grpc)';
          status = 404;
          break;
        case exception instanceof HttpNotFoundEntityError:
          exceptionType = exception.constructor.name;
          responseMessage = 'Resource Not Found In Backend (Http)';
          status = 404;
          break;
        case exception instanceof GrpcInternalError:
          exceptionType = exception.constructor.name;
          responseMessage = 'Internal Server Error In Backend (Grpc)';
          status = 500;
          break;
        case exception instanceof HttpInternalError:
          exceptionType = exception.constructor.name;
          responseMessage = 'Internal Server Error In Backend (Http)';
          status = 500;
          break;
        case exception instanceof MethodNotAllowedException:
          exceptionType = MethodNotAllowedException.name;
          responseMessage = 'Method Not Allowed By CORS';
          status = 405;
          break;
        default:
          exceptionType = Error.name;
          status = 500;
          break;
      }
    }
  }
}