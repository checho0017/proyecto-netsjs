import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { CustomLoggerService } from "./custom-logger.service";

@Injectable()
export class TracerInterceptor implements NestInterceptor {
  constructor(
    private logger: CustomLoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    
    return next
      .handle()
      .pipe(
        tap(() => this.logger.trace(startTime, request)),
      );
  };
}