import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findCredentials(username);
    // TODO: Hashed password using bcrypt and compare against the password in the database
    // if match return everything except the pasword
    // if not return null

    return null;
  }

  async login(user: any) {
    // TODO: return access token sign with jwt, naming conventions here is aligned with jwt conventions
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
