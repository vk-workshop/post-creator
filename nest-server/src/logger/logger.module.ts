import { Global, Module } from '@nestjs/common';
import { AppLogger } from './logger.service';
import { RequestLoggerMiddleware } from './request-logger.middleware';

@Global()
@Module({
  providers: [AppLogger, RequestLoggerMiddleware],
  exports: [AppLogger, RequestLoggerMiddleware],
})
export class LoggerModule {}