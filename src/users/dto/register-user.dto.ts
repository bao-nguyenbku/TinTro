import { UserEntity } from './../entities/user.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsByteLength, IsEmail, IsNotEmpty } from 'class-validator';
export class RegisterUserDtos extends OmitType(UserEntity, [
  'id',
  'role',
  'createdAt',
  'updatedAt',
]) {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
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
