import { Role } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
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

  uploadAvatar(file: Express.Multer.File) {
    // save file into public/uploads folder and return the path
  }

  getAvatarFile(avatarPath: string) {
    // return the file from public/uploads folder
  }
}
