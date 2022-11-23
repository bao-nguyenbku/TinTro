import { TokenPayload } from './dto/token.dto';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findCredentials(username);
    // TODO: Hashed password using bcrypt and compare against the password in the database
    // if match return everything except the pasword
    // if not return null

    return null;
  }

  login(user: any): TokenPayload {
    // TODO: return access token sign with jwt, naming conventions here is aligned with jwt conventions, change payload here
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
