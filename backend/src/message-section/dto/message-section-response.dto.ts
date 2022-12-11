<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { MessageSection } from '@prisma/client';

class MessageSectionResponse implements MessageSection {
  @ApiProperty()
  id: number;
}

export default MessageSectionResponse;
=======
import { ApiProperty } from '@nestjs/swagger';
import { MessageSection } from '@prisma/client';

class MessageSectionResponse implements MessageSection {
  @ApiProperty()
  id: number;
}

export default MessageSectionResponse;
>>>>>>> remotes/origin/ntb/checkout-when-renting
