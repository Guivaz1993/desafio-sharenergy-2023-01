import { CreateClient } from '@application/use-cases/clients/create-client';
import { DeleteClient } from '@application/use-cases/clients/delete-client';
import { GetClient } from '@application/use-cases/clients/get-client';
import { ListAll } from '@application/use-cases/clients/listAll-client';
import { UpdateClient } from '@application/use-cases/clients/update-client';
import { CreateUser } from '@application/use-cases/users/create-user';
import { FindUserByUsername } from '@application/use-cases/users/find-by-username-user';
import { DatabaseClientModule } from '@infra/database/database.client.module';
import { DatabaseUserModule } from '@infra/database/database.user.module';
import { Module } from '@nestjs/common';
import { ClientController } from './controller/client.controller';
import { UserController } from './controller/user.controller';

@Module({
  imports: [DatabaseUserModule, DatabaseClientModule],
  controllers: [UserController, ClientController],
  providers: [
    CreateUser,
    FindUserByUsername,
    CreateClient,
    GetClient,
    ListAll,
    UpdateClient,
    DeleteClient,
  ],
  exports: [FindUserByUsername],
})
export class HttpModule {}
