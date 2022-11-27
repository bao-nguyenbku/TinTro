import { UserEntity } from './../entities/user.entity';
import { RegisterUserDtos } from './register-user.dto';
import { PartialType, OmitType } from '@nestjs/swagger';

export class CreateUserDto extends OmitType(UserEntity, [
  'createdAt',
  'updatedAt',
]) {}
