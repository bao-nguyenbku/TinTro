import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterUserDtos } from './../users/dto/register-user.dto';
import { UserResponseDto } from './../users/dto/user.dto';
import { LocalAuthGuard } from './local-auth-guard';
import {
  Controller,
  Request,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenPayload, TokenResponse } from './dto/token.dto';
import { Body, Get } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiCreatedResponse({ type: TokenPayload })
  login(@Request() req): TokenPayload {
    return this.authService.login(req.user);
  }

  @Post('/register')
  @ApiCreatedResponse({ type: UserResponseDto })
  async register(@Body() user: RegisterUserDtos): Promise<UserResponseDto> {
    try {
      const newUser = await this.authService.register(user);
      await this.authService.saveUserToRenter(newUser);
      return newUser;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new BadRequestException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Email or Phone already exists',
          },
          {
            cause: err,
            description: `Email or Phone already exists`,
          },
        );
      }
      throw err;
    }
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: TokenResponse })
  async me(@Request() req): Promise<TokenResponse> {
    return req.user;
  }
}
