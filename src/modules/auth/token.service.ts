import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateTokens } from "./token.dto";
import { CommonService } from "../../common/common.servise";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TokenDocument } from "../../schemas/token.schema";

@Injectable()
export class TokenService extends CommonService<TokenDocument> {
  constructor(
    @InjectModel("Token") private tokenModel: Model<TokenDocument>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {
    super(tokenModel);
  }

  generateToken(payload): CreateTokens {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: "5h",
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: "60d",
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.findToken({ user: userId });

    if (tokenData) {
      const token = await this.tokenModel.updateOne(
        { user: userId },
        { refreshToken }
      );
      return token;
    }

    const token = await this.save({ user: userId, refreshToken });

    return token;
  }

  async findToken(query) {
    const token = await this.tokenModel.findOne(query);
    if (!token) {
      return null;
    }
    return token;
  }

  validateAccessToken(token) {
    try {
      const userDate = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return userDate;
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const userDate = await this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userDate;
    } catch (e) {
      return null;
    }
  }

  async removeToken(refreshToken) {
    const token = await this.tokenModel.deleteOne({
      refreshToken: refreshToken,
    });
    return token;
  }
}
