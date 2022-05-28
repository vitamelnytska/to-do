import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {usersMock} from "../../server/user-mock";
import {User} from "./schemas/users.schema";

let usersData = usersMock;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  async getAll(): Promise<CreateUserDto[]> {
    return usersData;
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createUser(@Body() createUser: CreateUserDto): CreateUserDto {
    const newUser: CreateUserDto = {
      id: (usersData.length + 1).toString(),
      ...createUser,
    };
    usersData = [...usersData, newUser];
    return newUser;
  }
}
