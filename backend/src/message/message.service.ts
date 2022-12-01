import { PrismaService } from 'src/prisma/prisma.service';
import { WsException } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { Socket } from 'socket.io';
import { MessageEntity } from './entities/message.entity';

import MessageSectionResponse from 'src/message-section/dto/message-section-response.dto';

@Injectable()
export class MessageService {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async getUserFromSocket(socket: Socket): Promise<UserEntity | null> {
    const token = socket.handshake.headers.authorization;
    if (!token) {
      throw new WsException('Token not found');
    }

    const user = await this.authService.verifyTokenWs(token);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async getAllMessagesFrom2UserIds(
    currentUserId: number,
    receiverId: number,
  ): Promise<MessageEntity | any> {
    // const messages = await this.prisma.message.findMany({
    //   where: {
    //     OR: [
    //       {
    //         fromId: currentUserId,
    //         toId: receiverId,
    //       },
    //       {
    //         fromId: receiverId,
    //         toId: currentUserId,
    //       },
    //     ],
    //   },
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });
    // return messages;
  }

  async createNewMessage(
    fromId: number,
    message: string,
    isExistSection: any,
    messageSection: MessageSectionResponse,
    updateIsExistSection: () => void,
  ): Promise<MessageEntity> {
    // const newMessage = await this.prisma.message.create({
    //   data: {
    //     text: message,
    //     from: {
    //       connect: { id: senderId },
    //     },
    //     to: {
    //       connect: { id: receiverId },
    //     },
    //   },
    // });
    // if (!isExistSection) {
    //   await this.prisma.messageSection.create({
    //     data: {
    //       currentUser: {
    //         connect: { id: senderId },
    //       },
    //       otherUser: {
    //         connect: { id: receiverId },
    //       },
    //       latestMessage: {
    //         connect: { id: newMessage.id },
    //       },
    //     },
    //   });
    //   updateIsExistSection();
    // } else {
    //   // update latest message Id
    //   await this.prisma.messageSection.update({
    //     where: {
    //       id: messageSection.id,
    //     },
    //     data: {
    //       latestMessage: {
    //         connect: { id: newMessage.id },
    //       },
    //     },
    //   });
    // }
    // return newMessage;
  }
}
