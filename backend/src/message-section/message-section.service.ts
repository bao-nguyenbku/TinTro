import { Injectable } from '@nestjs/common';
import { MessageSection } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import MessageSectionResponse from './dto/message-section-response.dto';

@Injectable()
export class MessageSectionService {
  constructor(private prisma: PrismaService) {}

  async getSections(id: number): Promise<MessageSection[] | undefined> {
    const sections = await this.prisma.messageSection.findMany({
      where: {
        OR: [{ currentUserId: id }, { otherUserId: id }],
      },
      include: {
        latestMessage: true,
        currentUser: {
          select: {
            name: true,
            avatar: true,
            id: true,
          },
        },
        otherUser: {
          select: {
            id: true,
            avatar: true,
            name: true,
          },
        },
      },
    });
    return sections;
  }

  async createNewSection(
    currentUserId: number,
    otherUserId: number,
  ): Promise<MessageSectionResponse | undefined> {
    const isExistSection = await this.prisma.messageSection.count({
      where: {
        OR: [
          {
            currentUserId: currentUserId,
            otherUserId: otherUserId,
          },
          {
            currentUserId: otherUserId,
            otherUserId: currentUserId,
          },
        ],
      },
    });
    if (!isExistSection) return;
  }
}
