import { IUserRepository } from './iuser-repository';
import { ITaskRepository } from './itask-repository';

export abstract class IDataServices {
  abstract tasks: ITaskRepository;

  abstract users: IUserRepository;
}
