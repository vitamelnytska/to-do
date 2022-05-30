import {Injectable} from '@nestjs/common';
import {CreateTaskDto} from './dto/сreate-task.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Task, TaskDocument} from './schemas/tasks.schema';
import {Model} from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  async getAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getById(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }
  //TODO fix
  async create(taskDto: CreateTaskDto): Promise<Task> {
    return await this.taskModel.create(taskDto);
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndRemove(id);
  }

  async update(id: string, taskDto: CreateTaskDto): Promise<Task> {
    const res = await this.taskModel.findByIdAndUpdate(
      id,
      { ...taskDto },
      { new: true },
    );
    await res.save();
    return res;
  }
}
