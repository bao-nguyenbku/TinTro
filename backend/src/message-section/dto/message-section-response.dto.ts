import { ApiProperty } from '@nestjs/swagger';
import { MessageSection } from '@prisma/client';

class MessageSectionResponse implements MessageSection {
  @ApiProperty()
  id: number;

  @ApiProperty()
  currentUserId: number;

  @ApiProperty()
  otherUserId: number;

  @ApiProperty()
  latestMessageId: number;
}

export default MessageSectionResponse;
