import { AuthModule } from '@infra/auth/auth.module';
import { JwtAuthGuard } from '@infra/auth/guards/jwt-auth.guard';
import { DatabaseClientModule } from '@infra/database/database.client.module';
import { DatabaseUserModule } from '@infra/database/database.user.module';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule, DatabaseUserModule, DatabaseClientModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
