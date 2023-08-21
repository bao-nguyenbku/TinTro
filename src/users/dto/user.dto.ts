import { UserEntity } from './../entities/user.entity';
import { OmitType } from '@nestjs/swagger';

export class UserResponseDto extends OmitType(UserEntity, ['password']) {}
