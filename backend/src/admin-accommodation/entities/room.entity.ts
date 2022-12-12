import { ApiProperty } from '@nestjs/swagger';

export class RoomEntity {
  @ApiProperty()
  roomName: string;

  @ApiProperty()
  personNumber: number;
}
