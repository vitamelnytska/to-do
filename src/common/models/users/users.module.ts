import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataServicesModule } from '../../../data-services/data-services.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [DataServicesModule],
})
export class UsersModule {}
