import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseTaskDto } from './base-task.dto';

export class TaskDto extends BaseTaskDto {
  @IsMongoId()
  @IsString()
  @IsOptional()
  id?: string;

  @IsMongoId()
  @IsNotEmpty()
  ownerId: string;

  @IsDate()
  @IsNotEmpty()
  creationDate: Date;
}
