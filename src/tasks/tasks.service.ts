import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/сreate-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  async getAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getById(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  async create(taskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(taskDto);
    return newTask.save();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndRemove();
  }

  async update(id: string, taskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, UpdateTaskDto, { new: true });
  }
}
