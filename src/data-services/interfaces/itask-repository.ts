import { BaseTaskDto, TaskDto } from '../../common/models/tasks/dto';

export interface ITaskRepository {
  getAll(userId: string, offset?: number, limit?: number): Promise<TaskDto[]>;

  getById(id: string, userId: string): Promise<TaskDto | null | undefined>;

  create(dto: TaskDto): Promise<TaskDto>;

  update(
    id: string,
    userId: string,
    dto: BaseTaskDto,
  ): Promise<BaseTaskDto | null | undefined>;

  remove(id: string, userId: string): Promise<TaskDto | null | undefined>;
}
