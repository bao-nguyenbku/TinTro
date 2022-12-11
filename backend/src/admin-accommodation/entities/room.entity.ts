import { ApiProperty } from '@nestjs/swagger';
import { RoomStatus } from '@prisma/client';

export class RoomEntity {
  @ApiProperty()
  status: RoomStatus;

  @ApiProperty()
  roomName: string;

  @ApiProperty()
  personNumber: number;
}
