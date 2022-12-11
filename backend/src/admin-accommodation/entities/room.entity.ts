import { ApiProperty } from '@nestjs/swagger';
import { RoomStatus } from '@prisma/client';

export class RoomEntity {
  @ApiProperty()
  status: RoomStatus;

  @ApiProperty()
  accommodationId: number;

  @ApiProperty()
  roomName: string;

  @ApiProperty()
  personNumber: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  utility: string;
}
