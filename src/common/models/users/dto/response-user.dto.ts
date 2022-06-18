import { UserDto } from './user.dto';
import { RoleEnum } from '../role.enum';

export class ResponseUserDto {
  constructor(user: UserDto) {
    this._id = user._id;
    this.creationDate = user.creationDate;
    this.banned = user.banned;
    this.banReason = user.banReason;
    this.roles = user.roles;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
  }

  _id?: string;

  creationDate: Date;

  banned: boolean;

  banReason?: string;

  roles: RoleEnum[];

  name: string;

  surname: string;

  email: string;
}
