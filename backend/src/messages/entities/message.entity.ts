import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Message {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsNotEmpty()
  fromId: number;

  @ApiProperty()
  @IsNotEmpty()
  toId: number;
}
