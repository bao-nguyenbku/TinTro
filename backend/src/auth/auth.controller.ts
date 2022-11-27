import { UserResponseDto } from './../users/dto/user.dto';
import { LocalAuthGuard } from './local-auth-guard';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenPayload } from './dto/token.dto';

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

  @post('/register')
  @ApiCreatedResponse({ type: UserResponseDto })
  register(@Body() user: UserRequestDto): Promise<UserResponseDto> {
    return this.authService.register(user);
  }
}
