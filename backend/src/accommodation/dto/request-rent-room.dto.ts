import { ApiProperty } from "@nestjs/swagger";
import { UserEntity as  } from "../../users/entities/user.entity";

export class AccommodationDto {
  @ApiProperty()
  id: Int32Array

  @ApiProperty()
  name: string

  @ApiProperty()
  addressNumber: string
  
  @ApiProperty()
  addressStreet: string

  @ApiProperty()
  addressDistrict: string

  @ApiProperty()
  addressCity: string

  @ApiProperty()
  area: Float32Array 

  // @ApiProperty()
  // rooms: Room[]

  @ApiProperty()
  owner: User 

  @ApiProperty()
  ownerId: Int32Array

  @ApiProperty()
  description: string

  @ApiProperty()
  utilities: string[]

}