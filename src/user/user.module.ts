import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Module({
  imports: [User],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
