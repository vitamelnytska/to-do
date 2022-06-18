import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataServicesModule } from '../../../data-services/data-services.module';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [DataServicesModule, forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
