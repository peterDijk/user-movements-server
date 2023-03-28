import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovementsModule } from './movements/movements.module';

const mongoDbUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_CONTAINER_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

// console.log({ mongoDbUri });

@Module({
  imports: [
    MovementsModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      // url: mongoDbUri,
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_CONTAINER_PORT),
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      database: process.env.MONGO_DB,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
