import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [TasksModule, UsersModule, AuthzModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
