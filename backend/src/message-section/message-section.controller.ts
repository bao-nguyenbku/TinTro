import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Logger, Request, UseGuards } from '@nestjs/common';
import { MessageSectionService } from './message-section.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import MessageSectionResponse from './dto/message-section-response.dto';

@Controller('message-sections')
@ApiTags('message-sections')
export class MessageSectionController {
  constructor(private readonly messageSectionService: MessageSectionService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MessageSectionResponse, isArray: true })
  async getSections(@Request() req) {
    try {
      const userId = req.user.id;
      const sections = await this.messageSectionService.getSections(userId);
      return sections;
    } catch (e) {
      throw e;
    }
  }
}
