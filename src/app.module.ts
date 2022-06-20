import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppService } from './app.service';
import { TasksModule } from './common/models/tasks/tasks.module';
import { UsersModule } from './common/models/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { DataServicesModule } from './data-services/data-services.module';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    DataServicesModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
