import { RegisterUserDtos } from './../users/dto/register-user.dto';
import { TokenPayload } from './dto/token.dto';
import { UsersService } from './../users/users.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
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
    const user = await this.usersService.findByEmail(username);
    // if match return everything except the pasword
    // if not return null
    if (user) {
      const { password: hashedPasswordInDb, ...result } = user;
      const isMatchPassword = await bcrypt.compare(
        password,
        hashedPasswordInDb,
      );
      if (!isMatchPassword) {
        return null;
      }
      return result;
    }
    return null;
  }

  login(user: any): TokenPayload {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterUserDtos): Promise<UserResponseDto> {
    if (user.password !== user.reEnterPassword) {
      throw new HttpException(
        'Password and re-enter password do not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    delete user.reEnterPassword;
    const createUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });

    delete createUser.password;
    return createUser;
  }
}
