import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MovementsService } from './movements.service';

@WebSocketGateway()
export class MovementGateway {
  private logger = new Logger(MovementGateway.name);

  constructor(private readonly movementsService: MovementsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('new_movement')
  handleMovement(
    @MessageBody() data: { userId: string; mouseX: number; mouseY: number },
  ) {
    this.logger.log(
      `incoming message "new_movement" from userId: ${data.userId}`,
    );
    this.movementsService.create(data);
    this.server.sockets.emit('new_movement_received', data);
  }
}
