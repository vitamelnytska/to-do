import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/сreate-task.dto';

@Injectable()
export class TasksService {
  private tasks = [];
  getAll() {
    return this.tasks;
  }

  getById(id: string) {
    return this.tasks.find((p) => p.id === id);
  }

  create(taskDto: CreateTaskDto) {
    this.tasks.push({
      ...taskDto,
      id: Date.now().toString(),
    });
  }
}
