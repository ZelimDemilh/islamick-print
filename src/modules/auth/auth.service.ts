import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateToken } from "./token.dto";
import { AuthUserDto, RegistrationUserDto } from "./auth.dto";
import * as bcrypt from "bcryptjs";
import * as uuid from "uuid";
import { MailService } from "./mail.service";
import { TokenService } from "./token.service";
import { log } from "util";

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private mailService: MailService,
    private usersService: UsersService
  ) {}

  async registration(userDto: RegistrationUserDto) {
    const candidate = await this.usersService.findByMail(userDto.mail);

    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email уже зарегестрирован",
        HttpStatus.BAD_REQUEST
      );
    }
    const activationLink = uuid.v4();
    const hashPassword = await bcrypt.hash(userDto.password, 3);

    const user = await this.usersService.save({
      ...userDto,
      password: hashPassword,
      activationLink: activationLink,
    });

    await this.mailService.senActivateMail(
      userDto.mail,
      `${process.env.API_URL}/auth/activated/${activationLink}`
    );

    const payloadCreateToken = new CreateToken(user);
    const tokens = await this.tokenService.generateToken({
      ...payloadCreateToken,
    });
    await this.tokenService.saveToken(
      payloadCreateToken.id,
      tokens.refreshToken
    );

    return {
      ...tokens,
      user: payloadCreateToken,
    };
  }

  async login(userDate: AuthUserDto) {
    const user = await this.usersService.findByMail(userDate.mail);
    if (!user) {
      throw new HttpException(
        "Пользователь с таким email не найдем",
        HttpStatus.BAD_REQUEST
      );
    }

    const isPasswordEquals = await bcrypt.compare(
      userDate.password,
      user.password
    );

    if (!isPasswordEquals) {
      throw new HttpException("Неверный пароль", HttpStatus.BAD_REQUEST);
    }

    const payloadCreateToken = new CreateToken(user);
    const tokens = await this.tokenService.generateToken({
      ...payloadCreateToken,
    });
    await this.tokenService.saveToken(
      payloadCreateToken.id,
      tokens.refreshToken
    );

    return {
      ...tokens,
      user: payloadCreateToken,
    };
  }
  async activate(activationLink) {
    const user = await this.usersService.findByActivateLink(activationLink);

    if (!user) {
      throw new HttpException(
        "Ваша почта не зарегестрирована на сайте",
        HttpStatus.BAD_REQUEST
      );
    }

    await this.usersService.update(user._id, { isActivated: true });
  }

  async logout(refreshToken) {
    return await this.tokenService.removeToken(refreshToken);
  }

  async refresh(token) {
    if (!token) {
      throw new HttpException("вы не авторизованы", HttpStatus.UNAUTHORIZED);
    }
    const userDate = await this.tokenService.validateRefreshToken(token);
    const tokenFromDb = await this.tokenService.findToken({
      refreshToken: token,
    });

    if (!userDate || !tokenFromDb) {
      throw new HttpException("вы не авторизованы", HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersService.getOnly(userDate.id);
    const payloadCreateToken = new CreateToken(user);
    const tokens = await this.tokenService.generateToken({
      ...payloadCreateToken,
    });
    await this.tokenService.saveToken(
      payloadCreateToken.id,
      tokens.refreshToken
    );

    return {
      ...tokens,
      user: payloadCreateToken,
    };
  }
}
