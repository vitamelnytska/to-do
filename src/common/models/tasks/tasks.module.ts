import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DataServicesModule } from '../../../data-services/data-services.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [DataServicesModule],
})
export class TasksModule {}
