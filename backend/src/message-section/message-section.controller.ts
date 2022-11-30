import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessageSectionService } from './message-section.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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

  @Post()
  @ApiCreatedResponse({ type: MessageSectionResponse })
  async createNewSection(
    @Request() req,
    @Body('otherUserId') otherUserId: number,
  ) {
    try {
      // TODO: check if section already exists
      const userId = req.user.id;
      const newSection = await this.messageSectionService.createNewSection(
        userId,
        otherUserId,
      );
      return newSection;
    } catch (e) {}
  }
}
