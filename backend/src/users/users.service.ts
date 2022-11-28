import { Role } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // ------------------------------ find username and password --------------------------------
  async findByEmail(username: string) {
    // user name must be email
    const user = await this.prisma.user.findUnique({
      where: {
        email: username,
      },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // Example of role based on role
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
