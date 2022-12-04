import { MessageSection } from '@prisma/client';
import { MessageEntity } from './../message/entities/message.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import MessageSectionResponse from './dto/message-section-response.dto';

@Injectable()
export class MessageSectionService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  async getSections(id: number): Promise<UserEntity[] | undefined> {
    // get all the sections and latest message of each section
    const sectionsOfUser = await this.userService.findMessageSectionsByUserId(
      id,
    );
    return sectionsOfUser;
  }

  async getMessageSectionById(id: number): Promise<MessageSectionResponse> {
    const section = await this.prisma.messageSection.findUnique({
      where: {
        id,
      },
    });
    return section;
  }

  async checkExistSectionBetween2Users(
    currentUserId: number,
    otherUserId: number,
  ): Promise<MessageSectionResponse> {
    const section = await this.prisma.messageSection.findFirst({
      select: {
        id: true,
        users: true,
      },
      where: {
        users: {
          some: {
            id: currentUserId,
            messageSections: {
              some: {
                users: {
                  some: {
                    id: otherUserId,
                  },
                },
              },
            },
          },
        },
      },
    });
    return section;
  }

  async createNewSectionBetween2Users(
    currentUserId: number,
    otherUserId: number,
  ): Promise<MessageSectionResponse | null> {
    const newSection = await this.prisma.messageSection.create({
      data: {
        users: {
          connect: [
            {
              id: currentUserId,
            },
            {
              id: otherUserId,
            },
          ],
        },
      },
    });
    return newSection;
  }

  async getAllMessagesOfSection(
    messageSectionId: number,
  ): Promise<MessageSectionResponse | null> {
    const allMessagesFromSection = await this.prisma.messageSection.findFirst({
      where: {
        id: messageSectionId,
      },
      include: {
        messages: true,
      },
    });
    return allMessagesFromSection;
  }
}
