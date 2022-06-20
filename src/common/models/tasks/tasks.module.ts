import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DataServicesModule } from '../../../data-services/data-services.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [DataServicesModule],
  exports: [TasksService],
})
export class TasksModule {}
