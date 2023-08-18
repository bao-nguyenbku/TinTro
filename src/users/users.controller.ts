import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Get,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { multerOptions } from './multer-options';
import { Request } from '@nestjs/common/decorators';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadAvatar(
    @UploadedFile()
    file: Express.Multer.File,
    @Request() req,
  ) {
    const filePath = `${req.protocol}://${req.get('host')}/public/uploads/${
      file.filename
    }`;
    const userId = req.user.id;
    await this.usersService.uploadAvatar(filePath, userId);
    return { avatar: filePath };
  }
}
