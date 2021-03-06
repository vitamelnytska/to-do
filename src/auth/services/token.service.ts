import { IDataServices } from '../../data-services/interfaces/idata-services';
import * as jwt from 'jsonwebtoken';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class TokenService {
  constructor(private dataService: IDataServices) {
    if (
      !process.env.JWT_ACCESS_SECRET ||
      !process.env.JWT_ACCESS_EXPIRES ||
      !process.env.JWT_REFRESH_SECRET ||
      !process.env.JWT_REFRESH_EXPIRES
    ) {
      throw new InternalServerErrorException();
    }
  }

  generateAccessToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    });
  }

  generateRefreshToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });
  }

  verifyAccessToken(token: string) {
    try {
      return (jwt.verify(token, process.env.JWT_ACCESS_SECRET) as any).payload;
    } catch {
      return null;
    }
  }

  verifyRefreshToken(token: string) {
    try {
      return (jwt.verify(token, process.env.JWT_REFRESH_SECRET) as any).payload;
    } catch {
      return null;
    }
  }

  removeToken(userId: string) {
    return this.dataService.tokens.removeByUserId(userId);
  }

  getTokenById(userId: string) {
    return this.dataService.tokens.getByUserId(userId);
  }

  saveToken(token: string, userId: string) {
    return this.dataService.tokens.create(token, userId);
  }
}
