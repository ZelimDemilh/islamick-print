import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { CreateToken } from "./token.dto";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];



    const user = this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });

    if (bearer !== "Bearer" || !token || !user) {
      throw new UnauthorizedException({ message: "Неверный токен" });
    }
    if (user.role !== "admin") {
      throw new UnauthorizedException({ message: "Пользователь не админ" });
    }
    return true;
  }
}
