import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipe,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';

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
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 }),
          new FileTypeValidator({ fileType: /\.(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.usersService.uploadAvatar(file);
  }

  @Get(':avatarPath')
  @UseGuards(JwtAuthGuard)
  getAvatarFile(@Param('avatarPath') avatarPath: string) {
    return this.usersService.getAvatarFile(avatarPath);
  }
}
