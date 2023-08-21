import { MessageSectionModule } from './../message-section/message-section.module';
import { UsersModule } from './../users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [MessageGateway, MessageService],
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    JwtModule,
    MessageSectionModule,
  ],
})
export class MessageModule {}
