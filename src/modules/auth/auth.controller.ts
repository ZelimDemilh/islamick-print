import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Res,
  Req,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUserDto } from "./auth.dto";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  async login(@Body() userDate: AuthUserDto, @Res({ passthrough: true }) res) {
    const user = await this.authService.login(userDate);
    res.cookie("refreshToken", user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return user;
  }

  @Post("/registration")
  async registration(@Body() userDate, @Res({ passthrough: true }) response) {
    const newUser = await this.authService.registration(userDate);
    response.cookie("refreshToken", newUser.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return newUser;
  }

  @Post("/logout")
  async logout(@Res({ passthrough: true }) res, @Req() req) {
    const { refreshToken } = req.cookies;
    res.clearCookie("refreshToken");
    return await this.authService.logout(refreshToken);
  }

  @Get("/activated/:link")
  activate(@Param("link") link: string, @Res({ passthrough: true }) response) {
    this.authService.activate(link);
    response.redirect(process.env.API_URL);
  }

  @Get("/refresh")
  async refresh(@Res({ passthrough: true }) response, @Req() req) {
    const { refreshToken } = req.cookies;
    const user = await this.authService.refresh(refreshToken);
    response.cookie("refreshToken", user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return user;
  }
}
