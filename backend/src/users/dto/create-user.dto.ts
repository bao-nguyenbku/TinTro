import { UserEntity } from './../entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateUserDto extends OmitType(UserEntity, [
  'createdAt',
  'updatedAt',
]) {}
