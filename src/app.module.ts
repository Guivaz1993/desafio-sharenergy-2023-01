import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    // MongooseModule.forRoot(process.env.MONGOOSE),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
