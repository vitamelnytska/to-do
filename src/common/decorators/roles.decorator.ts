import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../models/users/role.enum';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
