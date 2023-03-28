import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Movement } from './entities/movement.entity';

@Injectable()
export class MovementsService {
  private logger = new Logger(MovementsService.name);

  constructor(
    @InjectRepository(Movement)
    private movementRepository: MongoRepository<Movement>,
  ) {}

  create(data: { userId: string; mouseX: number; mouseY: number }) {
    this.logger.log(`incoming data to save: ${data}`);
    if (data.userId && data.mouseX && data.mouseY) {
      return this.movementRepository.save(data);
    }
  }

  findAll() {
    return this.movementRepository.find();
  }

  findByUser(userId: string) {
    return this.movementRepository.findBy({ userId });
  }
}
