import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
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
import { multerOptions } from './multer-options';

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
  ) {
    console.log('====================================');
    console.log(file);
    console.log('====================================');
    return this.usersService.uploadAvatar(file);
  }

  @Get(':avatarPath')
  @UseGuards(JwtAuthGuard)
  getAvatarFile(@Param('avatarPath') avatarPath: string) {
    return this.usersService.getAvatarFile(avatarPath);
  }
}
