import { UserEntity } from './../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsByteLength,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
export class RegisterUserDtos extends UserEntity {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsByteLength(4, 100)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsByteLength(4, 100)
  reEnterPassword: string;
}
