import { CreateUser } from '@application/use-cases/users/create-user';
import { FindUserByUsername } from '@application/use-cases/users/find-by-username-user';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUser, FindUserByUsername],
})
export class HttpModule {}
