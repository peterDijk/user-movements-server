import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovementsModule } from './movements/movements.module';

const mongoDbUri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_CONTAINER_PORT}/?retryWrites=true&w=majority`;

console.log({ mongoDbUri });

@Module({
  imports: [
    MovementsModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: mongoDbUri,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
