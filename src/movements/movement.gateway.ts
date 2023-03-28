import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MovementGateway {
  private logger = new Logger(MovementGateway.name);

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('new_movement')
  handleMovement(
    @MessageBody() data: { userId: string; mouseX: number; mouseY: number },
  ) {
    this.logger.log('incoming message "new_movement"', { userId: data.userId });
    this.server.sockets.emit('receive_message', data);
  }
}
