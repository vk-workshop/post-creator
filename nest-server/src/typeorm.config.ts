import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppLogger } from './logger/logger.service';
import { Logger as TypeOrmLoggerInterface } from 'typeorm';

class TypeORMLogger implements TypeOrmLoggerInterface {
  constructor(private readonly logger: AppLogger) {}

  logQuery(query: string, parameters?: any[]) {
    this.logger.debug(`Query: ${query} Parameters: ${JSON.stringify(parameters)}`, 'TypeORM');
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    this.logger.error(`Query failed: ${query} Error: ${error}`, '', 'TypeORM');
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.warn(`Slow query (${time}ms): ${query}`, 'TypeORM');
  }

  logSchemaBuild(message: string) {
    this.logger.log(`Schema build: ${message}`, 'TypeORM');
  }

  logMigration(message: string) {
    this.logger.log(`Migration: ${message}`, 'TypeORM');
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    switch (level) {
      case 'log':
        this.logger.debug(message, 'TypeORM');
        break;
      case 'info':
        this.logger.log(message, 'TypeORM');
        break;
      case 'warn':
        this.logger.warn(message, 'TypeORM');
        break;
    }
  }
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '211090',
  database: process.env.DB_NAME || 'blog',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  logger: new TypeORMLogger(new AppLogger()),
};