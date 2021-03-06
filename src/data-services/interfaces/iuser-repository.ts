import { AddRoleDto, BanUserDto, UserDto } from '../../common/models/users/dto';
import { UpdateUserDto } from '../../common/models/users/dto/update-user.dto';

export interface IUserRepository {
  getAll(offset: number, limit: number): Promise<UserDto[]>;

  getById(id: string): Promise<UserDto | null | undefined>;

  getByEmail(email: string): Promise<UserDto | null | undefined>;

  create(dto: UserDto): Promise<UserDto>;

  update(id: string, dto: UpdateUserDto): Promise<UserDto | null | undefined>;

  remove(id: string): Promise<UserDto | null | undefined>;

  addRole(
    id: string,
    addRoleDto: AddRoleDto,
  ): Promise<UserDto | null | undefined>;

  ban(id: string, banUserDto: BanUserDto): Promise<UserDto | null | undefined>;

  updatePassword(
    id: string,
    password: string,
  ): Promise<UserDto | null | undefined>;
}
