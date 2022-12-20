import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AST } from 'eslint';
import Token = AST.Token;
import { config } from 'rxjs';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  hashData = (data: string) => {
    return bcrypt.hash(data, 10);
  };

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async register(createUserDto: any): Promise<any> {
  //   // Check if user exists
  //   const userExists = await this.usersService.findOne(createUserDto.username);
  //   if (userExists) {
  //     throw new BadRequestException('User already exists');
  //   }
  //
  //   // Hash password
  //   const hashPassword = await this.hashData(createUserDto.password);
  //   const newUser = await this.usersService.create({
  //     ...createUserDto,
  //     password: hashPassword,
  //   });
  //   const tokens = await this.getToken(newUser._id, newUser.username);
  //   await this.updateRefreshToken(newUser._id, tokens.refreshToken);
  //   return tokens;
  // }

  loggout = (req: any) => {
    const userId = req.user.userId;
    return {
      access_token: null,
      refresh_token: null,
    };
    req.logout();
  };

  async getRefreshToken(userId: number) {
    const payload = { userId };

    return {
      refresh_token: this.jwtService.sign(payload),
    };
  }

  // NEW TRY
  // public async createAccessTokenFromRefreshToken(refreshToken: string) {
  //   try {
  //     const decoded = this.jwtService.decode(refreshToken);
  //     if (!decoded) {
  //       throw new Error();
  //     }
  //     const user = await this.usersService.getUserByEmail(decoded.email);
  //     if (!user) {
  //       throw new HttpException(
  //         'User with this id does not exist',
  //         HttpStatus.NOT_FOUND,
  //       );
  //     }
  //     const isRefreshTokenMatching = await bcrypt.compare(
  //       refreshToken,
  //       user.refresh_token,
  //     );
  //     if (!isRefreshTokenMatching) {
  //       throw new UnauthorizedException('Invalid token');
  //     }
  //     await this.jwtService.verifyAsync<Token>(
  //       refreshToken,
  //       // this.getRefreshTokenOptions(user),
  //     );
  //     return this.login(user);
  //   } catch {
  //     throw new UnauthorizedException('Invalid token');
  //   }
  // }
  // getRefreshTokenOptions(user: User): JwtSignOptions {
  //   return this.getTokenOptions('refresh', user);
  // }
  // private getTokenOptions(type: string, user: User) {
  //   const options: JwtSignOptions = {
  //     secret: jwtConstants.refreshSecret,
  //   };
  //   const expiration: number = jwtConstants.refreshTokenExpiration;
  //   if (expiration) {
  //     options.expiresIn = expiration;
  //   }
  //   return options;
  // }
  // async setCurrentRefreshToken(refreshToken: string, userId: number) {
  //   const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  //
  //   return await this.usersService.update(userId, {
  //     refresh_token: currentHashedRefreshToken,
  //   });
  // }

  // async removeRefreshToken(userElement: any) {
  //   const user = await this.usersService.findOne(userElement);
  //
  //   if (!user) {
  //     throw new HttpException(
  //       'User with this id does not exist',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //
  //   return this.usersService.update(
  //     { userElement },
  //     {
  //       refresh_token: null,
  //     },
  //   );
  // }
  //
  // async removeRefreshToken(userElement: any) {
  //   const user = await this.usersService.findOne(userElement);
  //   if (!user) {
  //     throw new HttpException(
  //       'User with this id does not exist',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return this.usersService.update(
  //     { userElement },
  //     {
  //       refresh_token: null,
  //     },
  //   );
  // }
}
