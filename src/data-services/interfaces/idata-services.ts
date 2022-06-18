import { IUserRepository } from './iuser-repository';
import { ITaskRepository } from './itask-repository';
import { ITokenRepository } from './itoken-repository';

export abstract class IDataServices {
  abstract tasks: ITaskRepository;

  abstract users: IUserRepository;

  abstract tokens: ITokenRepository;
}
