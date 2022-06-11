import { Task, TaskDocument } from './schemas/tasks.schema';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from '../interfaces/idata-services';
import { TaskRepositoryMongo } from './repositories/task-repository-mongo';
import { UserRepositoryMongo } from './repositories/user-repository-mongo';

@Injectable()
export class DataServicesMongo
  implements IDataServices, OnApplicationBootstrap
{
  tasks: TaskRepositoryMongo;

  users: UserRepositoryMongo;

  constructor(
    @InjectModel(Task.name)
    private TaskRepository: Model<TaskDocument>,
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
  ) {}

  onApplicationBootstrap(): any {
    this.tasks = new TaskRepositoryMongo(this.TaskRepository);
    this.users = new UserRepositoryMongo(this.UserRepository);
  }
}
