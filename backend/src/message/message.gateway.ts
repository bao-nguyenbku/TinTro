import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets/interfaces';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { Logger } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { ConnectedSocket, WsException } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { MessageSectionService } from 'src/message-section/message-section.service';
import { MessageEntity } from './entities/message.entity';

@WebSocketGateway({
  namespace: 'message',
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('MessageGateway');

  isExistSection = false;
  messageSection = null;
  currentUser = null;
  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly messageSectionService: MessageSectionService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('----------- Init websocket -----------');
  }

  async handleConnection(socket: Socket) {
    try {
      this.currentUser = await this.messageService.getUserFromSocket(socket);
      const receiverId = Number(socket.handshake.query.receiverId);
      // Check if section between users already exists, fetch that section

      this.messageSection =
        await this.messageSectionService.checkExistSectionBetween2Users(
          this.currentUser.id,
          receiverId,
        );

      if (this.messageSection) {
        this.isExistSection = true;
      }

      const receiver = await this.userService.findById(receiverId);
      if (!receiver) {
        throw new WsException('Receiver not found');
      }

      this.logger.debug(this.currentUser.id);
    } catch (e) {
      this.logger.error(e);
      socket.emit('error', e);
      socket.disconnect(true);
      throw e;
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    client.disconnect(true);
  }

  @SubscribeMessage('send_message')
  // listen for messages
  async listenForMessages(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: string,
  ) {
    try {
      const receiverId = Number(socket.handshake.query.receiverId);
      const sender =
        this.currentUser ||
        (await this.messageService.getUserFromSocket(socket));
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  @SubscribeMessage('fetch-all-messages')
  async requestAllMessages(@ConnectedSocket() socket: Socket) {
    try {
      this.logger.log('----------- Request all messages -----------');
      const currentUser =
        this.currentUser ||
        (await this.messageService.getUserFromSocket(socket));

      this.logger.log(
        `----------------------- ALL MESSAGES OF ${currentUser.id} --------------------`,
      );
      this.logger.debug(JSON.stringify(currentUser, null, 2));
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
