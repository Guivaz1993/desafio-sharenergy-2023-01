import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientRepository } from '@application/repositories/clients-repository';
import { PrismaClientRepository } from './prisma/repositories/prisma-client-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
  exports: [ClientRepository],
})
export class DatabaseClientModule {}
