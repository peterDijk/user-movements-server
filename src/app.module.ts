import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovementsModule } from './movements/movements.module';

const mongoUrl = `mongodb://admin:admin@movements-db:27016/user-movements?authSource=admin`;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      // url: mongoUrl,
      host: 'movements-db',
      port: 27016,
      username: 'admin',
      password: 'admin',
      database: 'user-movements',
      authSource: 'admin',
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
