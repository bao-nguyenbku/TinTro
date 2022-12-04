import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
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
import { MessageSectionService } from 'src/message-section/message-section.service';

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

  messageSection = null;
  currentUser = null;
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UsersService,
    private readonly messageSectionService: MessageSectionService,
  ) {}

  afterInit(server: Server) {
    this.logger.log(
      '----------- Init websocket -----------  #',
      server.eventNames(),
    );
  }

  async handleConnection(socket: Socket) {
    try {
      // ! Client can pass receiverId if section did not exist, or pass the messageSectionId itself if it has existed
      this.currentUser = await this.messageService.getUserFromSocket(socket);
      const receiverId = Number(socket.handshake.query.receiverId);
      const messageSectionId = Number(socket.handshake.query.messageSectionId);
      // ! Check if section between users already exists, fetch that section
      this.messageSection =
        (messageSectionId &&
          (await this.messageSectionService.getMessageSectionById(
            messageSectionId,
          ))) ||
        (await this.messageSectionService.checkExistSectionBetween2Users(
          this.currentUser.id,
          receiverId,
        ));
      this.logger.debug(this.messageSection);

      if (
        receiverId &&
        !this.messageSection &&
        Array.isArray(this.messageSection) &&
        this.messageSection.length === 0
      ) {
        this.messageSection = null;
        const receiver = await this.userService.findById(receiverId);
        if (!receiver) {
          throw new WsException('Receiver not found');
        }
      }

      if (!this.messageSection) {
        // *Join the room of the section
        // *create new section
        this.messageSection =
          await this.messageSectionService.createNewSectionBetween2Users(
            this.currentUser.id,
            receiverId,
          );
        this.logger.debug(
          'Message section created successfully ',
          this.messageSection.id,
        );
      }
      this.logger.debug('Client joined section  ', this.messageSection.id);
      this.server.socketsJoin(this.messageSection.id);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(
      `Client disconnected: ${client.id} of user id: ${this.currentUser.id}`,
    );
    this.logger.log(`Message section: ${client.rooms}`);
  }

  @SubscribeMessage('message-sent-from-client')
  async listenForMessages(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: object,
  ): Promise<WsResponse<string> | void> {
    try {
      this.logger.log(
        '---------- - Listen for messages ----------- # ' + message,
      );
      const newMessage = await this.messageService.createNewMessage(
        this.currentUser.id,
        this.messageSection.id,
        message,
      );
      this.server
        .to(this.messageSection.id)
        .emit('client-receive-message', newMessage);
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
      const allMessagesFromSection =
        await this.messageSectionService.getAllMessagesOfSection(
          this.messageSection.id,
        );
      //* we want to emit to client only
      socket.emit('client-all-past-messages', allMessagesFromSection);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
