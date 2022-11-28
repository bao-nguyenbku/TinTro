import { UserResponseDto } from './../users/dto/user.dto';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<UserResponseDto> {
    const user = await this.authService.validateUser(email, password);
    this.logger.debug('User: ' + JSON.stringify(user));
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    } else return user;
  }
}
