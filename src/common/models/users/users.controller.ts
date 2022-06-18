import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AddRoleDto, BanUserDto, UserDto } from './dto';
import { PaginationPipe } from '../../pipes/pagination/pagination.pipe';
import { PaginationDto } from '../../pipes/pagination/dto/pagination.dto';
import { ObjectIdValidationPipe } from '../../pipes/object-id/objectid-validation.pipe';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from './role.enum';
import { ResponseUserDto } from './dto/response-user.dto';
import { UpdateOthersPassword } from './dto/update-others-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Roles } from '../../decorators/roles.decorator';
import { User } from '../../decorators/user.decorator';
import { RoleGuard } from '../../../auth/guards/role.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(RoleGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  private static checkIfUserIsAllowed(userId: string, authUser: UserDto): void {
    if (userId == authUser._id.toString()) {
      return;
    }
    if (!authUser.roles.includes(RoleEnum.Admin)) {
      throw new ForbiddenException();
    }
  }

  @Put('change-password-by-email')
  @Roles(RoleEnum.Admin)
  async changeOthersPassword(@Body() updatePasswordDto: UpdateOthersPassword) {
    return new ResponseUserDto(
      await this.usersService.changeOthersPassword(updatePasswordDto),
    );
  }

  @Put('change-password')
  async changePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @User() user: UserDto,
  ) {
    return new ResponseUserDto(
      await this.usersService.changePassword(user._id, updatePasswordDto),
    );
  }

  @Get()
  @UsePipes(new PaginationPipe(0, 10))
  @Roles(RoleEnum.Admin)
  async getAll(@Query() pagination: PaginationDto) {
    const users = await this.usersService.getAll(pagination);
    return users.map((user) => new ResponseUserDto(user));
  }

  @Get(':id')
  async getById(@Param('id', ObjectIdValidationPipe) id: string) {
    return new ResponseUserDto(await this.usersService.getById(id));
  }

  @Put(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ObjectIdValidationPipe) id: string,
    @User() authUser: UserDto,
  ) {
    UsersController.checkIfUserIsAllowed(id, authUser);
    return new ResponseUserDto(
      await this.usersService.update(id, updateUserDto),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ObjectIdValidationPipe) id: string,
    @User() authUser: UserDto,
  ) {
    UsersController.checkIfUserIsAllowed(id, authUser);
    return new ResponseUserDto(await this.usersService.remove(id));
  }

  @Post(':id/role')
  @Roles(RoleEnum.Admin)
  async addRole(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() addRoleDto: AddRoleDto,
  ) {
    return new ResponseUserDto(await this.usersService.addRole(id, addRoleDto));
  }

  @Post(':id/ban')
  @Roles(RoleEnum.Admin)
  async ban(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() banUserDto: BanUserDto,
  ) {
    return new ResponseUserDto(await this.usersService.ban(id, banUserDto));
  }
}
