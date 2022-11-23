import { Role, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsInt } from 'class-validator';
export class UserEntity implements User {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
