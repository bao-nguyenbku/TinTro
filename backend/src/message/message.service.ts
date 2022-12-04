import { PrismaService } from 'src/prisma/prisma.service';
import { WsException } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { Socket } from 'socket.io';

@Injectable()
export class MessageService {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async getUserFromSocket(socket: Socket): Promise<UserEntity | null> {
    const token =
      socket.handshake.auth?.token || socket.handshake.headers?.authorization;
    if (!token) {
      throw new WsException('Token not found');
    }
    const user = await this.authService.verifyTokenWs(token);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async createNewMessage(
    fromId: number,
    messageSectionId: number,
    text: string,
  ) {
    const message = await this.prisma.message.create({
      data: {
        fromId,
        messageSectionId,
        text,
      },
    });
    return message;
  }
}
