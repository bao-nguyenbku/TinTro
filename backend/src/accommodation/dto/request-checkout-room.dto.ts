import { ApiProperty } from '@nestjs/swagger';
import { RequestRentRoomEntity } from '../entities/request-rent-room.entity';

export class RequestCheckoutRoomDto extends RequestRentRoomEntity {
  @ApiProperty()
  rentingId: number;
}
