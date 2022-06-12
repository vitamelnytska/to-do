import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IDataServices } from '../../../data-services/interfaces/idata-services';
import { BaseTaskDto, TaskDto } from './dto';
import { PaginationDto } from '../../pipes/pagination/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private dataServices: IDataServices) {}

  async getAll(pagination: PaginationDto, userId: string) {
    const tasks = await this.dataServices.tasks.getAll(
      userId,
      pagination.offset,
      pagination.limit,
    );
    if (!tasks) {
      throw new InternalServerErrorException();
    }
    return tasks;
  }

  async getById(id: string, userId: string) {
    const task = await this.dataServices.tasks.getById(id, userId);
    if (!task) {
      throw new NotFoundException('No task with this id!');
    }
    return task;
  }

  async create(taskDto: BaseTaskDto, userId: string) {
    const newTask: TaskDto = {
      ...taskDto,
      creationDate: new Date(),
      ownerId: userId,
    };
    const savedTask = await this.dataServices.tasks.create(newTask);
    if (!savedTask) {
      throw new InternalServerErrorException();
    }
    return savedTask;
  }

  async remove(id: string, userId: string) {
    const removedTask = await this.dataServices.tasks.remove(id, userId);
    if (!removedTask) {
      throw new NotFoundException('No task with this id to remove!');
    }
    return removedTask;
  }

  async update(id: string, updateTaskDto: BaseTaskDto, userId: string) {
    const task = await this.getById(id, userId);
    if (task.ownerId !== userId) {
      throw new BadRequestException('User cannot delete this task, it not his');
    }
    const savedTask = await this.dataServices.tasks.update(
      id,
      userId,
      updateTaskDto,
    );
    if (!savedTask) {
      throw new InternalServerErrorException();
    }
    return savedTask;
  }
}
