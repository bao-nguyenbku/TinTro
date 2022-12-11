<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsByteLength(8, 100)
  password: string;
}
=======
import { ApiProperty } from '@nestjs/swagger';
import { IsByteLength, IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsByteLength(8, 100)
  password: string;
}
>>>>>>> remotes/origin/ntb/checkout-when-renting
