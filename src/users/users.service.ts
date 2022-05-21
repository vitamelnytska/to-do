import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [];
  getAll() {
    return this.users;
  }

  getById(id: string) {
    return this.users.find((p) => p.id === id);
  }

  create(userDto: CreateUserDto) {
    this.users.push({
      ...userDto,
      id: Date.now().toString(),
    });
  }
}
