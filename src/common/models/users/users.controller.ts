import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AddRoleDto, BanUserDto, BaseUserDto } from './dto';
import { PaginationPipe } from '../../pipes/pagination/pagination.pipe';
import { PaginationDto } from '../../pipes/pagination/dto/pagination.dto';
import { ObjectIdValidationPipe } from '../../pipes/object-id/objectid-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: BaseUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  getAll(@Query() pagination: PaginationDto) {
    return this.usersService.getAll(pagination);
  }

  @Get(':id')
  getById(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.usersService.getById(id);
  }

  @Put(':id')
  update(
    @Body() updateUserDto: BaseUserDto,
    @Param('id', ObjectIdValidationPipe) id: string,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ObjectIdValidationPipe) id: string) {
    return this.usersService.remove(id);
  }

  @Post(':id/role')
  addRole(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() addRoleDto: AddRoleDto,
  ) {
    return this.usersService.addRole(id, addRoleDto);
  }

  @Post(':id/ban')
  ban(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() banUserDto: BanUserDto,
  ) {
    return this.usersService.ban(id, banUserDto);
  }
}
