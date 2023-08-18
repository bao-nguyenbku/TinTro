import { ApiProperty } from '@nestjs/swagger';

export class RequestRentRoomEntity {
  @ApiProperty()
  renterId: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  accommodationId: number;
}
