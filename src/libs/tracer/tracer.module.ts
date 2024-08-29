import { Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TracerInterceptor } from './tracer.interceptor';

@Module({
  imports: [],
  providers: [
    CustomLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TracerInterceptor
    }
  ],
  exports: [CustomLoggerService]
})
export class TracerModule {}