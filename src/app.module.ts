import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovementsModule } from './movements/movements.module';

export const SOURCE_PATH =
  process.env.ENV === 'production' ? 'dist/src' : 'src';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_CONTAINER_PORT),
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      database: process.env.MONGO_DB,
      useUnifiedTopology: true,
      synchronize: true,
      logger: 'debug',
      autoLoadEntities: true,
      // entities: [`dist/src/**/*.entity{.js}`],
    }),
    MovementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
