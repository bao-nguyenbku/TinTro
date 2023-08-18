import { ApiProperty } from '@nestjs/swagger';
import { RoomStatus } from '@prisma/client';
import { RoomEntity } from '../entities/room.entity';

export class updateRoomDto extends RoomEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: RoomStatus;
}
