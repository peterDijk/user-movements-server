import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovementsModule } from './movements/movements.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'movements-db',
      port: 27016,
      username: 'admin',
      password: 'admin',
      // database: 'user-movements',
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
