import { Body, Controller, Get, Post } from '@nestjs/common';
import { Movement } from './entities/movement.entity';
import { MovementsService } from './movements.service';

@Controller()
export class MovementsController {
  constructor(private readonly movementService: MovementsService) {}

  @Get()
  getAll(): Promise<Movement[]> {
    return this.movementService.findAll();
  }

  @Post('new')
  addMovement(
    @Body()
    { userId, mouseX, mouseY }: any,
  ) {
    return this.movementService.create({ userId, mouseX, mouseY });
  }
}
