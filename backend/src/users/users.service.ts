import { MessageSection, Role } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  exclude<UserEntity, Key extends keyof UserEntity>(
    user: UserEntity,
    keys: Key[],
  ): Omit<UserEntity, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  // FOR USERs ONLY
  async create(user: CreateUserDto): Promise<UserEntity> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: user.email,
          password: user.password,
          role: Role.USER,
          name: user.name,
          phone: user.phone,
        },
      });
      return newUser;
    } catch (e) {
      throw e;
    }
  }

  async findById(id: number): Promise<UserEntity> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(username: string) {
    // user name must be email
    const user = await this.prisma.user.findUnique({
      where: {
        email: username,
      },
    });
    return user;
  }

  async findMessageSectionsByUserId(id: number): Promise<UserEntity | any> {
    const userWithMessageSections = await this.prisma.user.findUnique({
      where: { id },
      select: {
        messageSections: {
          select: {
            id: true,
            messages: {
              select: {
                id: true,
                text: true,
              },
            },
            users: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return userWithMessageSections;
  }

  async findMessageSectionsBetweenCurrentUserAndTheOther(
    currentUserId: number,
    otherUserId: number,
  ): Promise<any | null> {
    const checkSection = await this.prisma.user.findUnique({
      where: { id: currentUserId },
      select: {
        messageSections: {
          where: {
            users: {
              some: {
                id: otherUserId,
              },
            },
          },
          take: 1,
        },
      },
    });
    if (!checkSection) return null;
    return checkSection;
  }
}
