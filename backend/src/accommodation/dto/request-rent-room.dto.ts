import { ApiProperty } from '@nestjs/swagger';
// import { UserEntity as Renter } from "~/users/entities/user.entity";

export class RequestRentRoomDto {
  @ApiProperty()
  renterId: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  accommodationId: number;
}
