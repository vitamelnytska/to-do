import { Model } from 'mongoose';
import { TaskDocument } from '../schemas/tasks.schema';
import { ITaskRepository } from '../../interfaces/itask-repository';
import { BaseTaskDto, TaskDto } from '../../../common/models/tasks/dto';

export class TaskRepositoryMongo implements ITaskRepository {
  private _repository: Model<TaskDocument>;

  constructor(repository: Model<TaskDocument>) {
    this._repository = repository;
  }

  getAll(userId: string): Promise<TaskDto[]> {
    return this._repository.find({ ownerId: userId }).exec();
  }

  getById(id: string, userId: string): Promise<TaskDto> {
    return this._repository.findOne({ _id: id, ownerId: userId }).exec();
  }

  create(dto: TaskDto): Promise<TaskDto> {
    return this._repository.create(dto);
  }

  update(id: string, userId: string, dto: BaseTaskDto): Promise<BaseTaskDto> {
    return this._repository
      .findOneAndUpdate({ _id: id, ownerId: userId }, dto, { new: true })
      .exec();
  }

  remove(id: string, userId: string): Promise<TaskDto> {
    return this._repository
      .findOneAndRemove({ _id: id, ownerId: userId })
      .exec();
  }
}
