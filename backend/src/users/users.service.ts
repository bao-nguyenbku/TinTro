import { MessageSection, Role, User } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user.dto';

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
        id: true,
        name: true,
        email: true,
        messageSections: {
          select: {
            id: true,
            messages: {
              select: {
                id: true,
                text: true,
                fromId: true,
                from: {
                  select: {
                    name: true,
                    avatar: true,
                    createdAt: true,
                  },
                },
                createdAt: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
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

    userWithMessageSections.messageSections.sort((a, b) => {
      const aDate = new Date(a.messages[0].createdAt);
      const bDate = new Date(b.messages[0].createdAt);
      return bDate.getTime() - aDate.getTime();
    });

    return userWithMessageSections;
  }

  async saveToRenter(user: UserResponseDto) {
    const renter = await this.prisma.renter.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return renter;
  }

  uploadAvatar(filePath: string, userId: number): Promise<User> {
    Logger.log('upload avatar', filePath);
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        avatar: filePath,
      },
    });
  }
}
