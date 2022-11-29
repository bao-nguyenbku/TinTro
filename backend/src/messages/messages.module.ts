import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [PrismaModule],
  exports: [MessagesService],
})
export class MessagesModule {}
