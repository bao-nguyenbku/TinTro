import { ApiProperty } from '@nestjs/swagger';

export class MessageEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  fromId: number;

  @ApiProperty()
  createdAt: Date;
}
