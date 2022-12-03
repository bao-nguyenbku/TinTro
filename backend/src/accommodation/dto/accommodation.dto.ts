import { ApiProperty } from "@nestjs/swagger";
import { Owner, Room, RentRequest } from "@prisma/client";
export class AccommodationResponseDto {
  @ApiProperty()
  id: number

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
  area: number

  @ApiProperty()
  rooms: Room[]

  @ApiProperty()
  price: number

  @ApiProperty()
  owner: Owner 

  @ApiProperty()
  ownerId: number

  @ApiProperty()
  description: string
  
  @ApiProperty()
  thumbnail: string

  @ApiProperty()
  images: string[]

  @ApiProperty()
  utilities: string[]

  @ApiProperty()
  rentRequest: RentRequest[]
}