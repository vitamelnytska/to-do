import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleEnum } from '../../../common/models/users/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: 'JackName', description: 'name' })
  @Prop({
    required: true,
  })
  name: string;

  @ApiProperty({ example: 'Surname', description: 'surname' })
  @Prop({
    required: true,
  })
  surname: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @Prop({
    required: true,
  })
  email: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  @Prop({
    required: true,
  })
  password: string;

  @ApiProperty({ example: '22/05/09', description: 'email' })
  @Prop({
    required: true,
  })
  creationDate: Date;

  @ApiProperty({ example: 'true', description: 'email' })
  @Prop({
    required: true,
  })
  banned: boolean;

  @ApiProperty({ example: 'просто так', description: 'email' })
  @Prop()
  banReason: string;

  @Prop({
    required: true,
  })
  roles: RoleEnum[];
}

export const UserSchema = SchemaFactory.createForClass(User);
