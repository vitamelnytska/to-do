import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class BaseTaskDto {
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  priority: number;

  @IsNumber()
  duration: number;

  @MaxLength(25)
  @MinLength(2)
  @IsOptional()
  @IsString()
  status?: string;
}
