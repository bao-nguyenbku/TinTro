import { Module } from '@nestjs/common';
import { MessageSectionService } from './message-section.service';
import { MessageSectionController } from './message-section.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MessageSectionController],
  providers: [MessageSectionService],
  imports: [PrismaModule],
  exports: [MessageSectionService],
})
export class MessageSectionModule {}
