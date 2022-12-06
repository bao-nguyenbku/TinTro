import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class TokenPayload {
  @ApiProperty()
  access_token: string;
}

export class TokenResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;
}
