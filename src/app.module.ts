import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [TasksModule,
    UsersModule,
    MongooseModule.forRoot(``)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
