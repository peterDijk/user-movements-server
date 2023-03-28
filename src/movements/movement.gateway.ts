import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MovementsService } from './movements.service';

@WebSocketGateway({ cors: true })
export class MovementGateway implements OnGatewayInit, OnGatewayConnection {
  private logger = new Logger(MovementGateway.name);
  @WebSocketServer()
  server: Server;

  constructor(private readonly movementsService: MovementsService) {}

  afterInit(server: any) {
    this.logger.log('Websocket server initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(
      `new client connected - client id: ${client.id} from ip address: ${client.conn.remoteAddress}`,
    );
  }

  @SubscribeMessage('new_movement')
  handleMovement(
    @ConnectedSocket() client,
    @MessageBody() data: { userId: string; mouseX: number; mouseY: number },
  ) {
    this.logger.log(
      `incoming message "new_movement" from userId: ${data.userId} over socket client id: ${client.id}`,
    );
    this.movementsService.create(data);
    this.server.sockets.emit('new_movement_received', data);
  }
}
