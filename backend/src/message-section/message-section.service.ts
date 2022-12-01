import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

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

  async checkExistSectionBetween2Users(
    currentUserId: number,
    otherUserId: number,
  ): Promise<UserEntity> {
    const checkSection =
      await this.userService.findMessageSectionsBetweenCurrentUserAndTheOther(
        currentUserId,
        otherUserId,
      );
    return checkSection;
  }

  async createNewSection(currentUserId: number, otherUserId: number) {
    
  }
}
