import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../common/models/users/users.module';
import { DataServicesModule } from '../data-services/data-services.module';
import { TokenService } from './services/token.service';

@Module({
  imports: [DataServicesModule, forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [TokenService],
})
export class AuthModule {}
