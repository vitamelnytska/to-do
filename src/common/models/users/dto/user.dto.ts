import {
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseUserDto } from './base-user.dto';
import { RoleEnum } from '../role.enum';

export class UserDto extends BaseUserDto {
  @IsMongoId()
  @IsString()
  @IsOptional()
  _id?: string;

  @IsDate()
  @IsNotEmpty()
  creationDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  banned: boolean;

  @MaxLength(500)
  @MinLength(4)
  @IsString()
  @IsNotEmpty()
  banReason?: string;

  roles: RoleEnum[];
}
