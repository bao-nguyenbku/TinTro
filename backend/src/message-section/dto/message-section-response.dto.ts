import { ApiProperty } from '@nestjs/swagger';
import { MessageSection } from '@prisma/client';

class MessageSectionResponse implements MessageSection {
  @ApiProperty()
  id: number;
}

export default MessageSectionResponse;
