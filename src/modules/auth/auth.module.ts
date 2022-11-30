import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { MailService } from "./mail.service";
import { TokenService } from "./token.service";
import { MongooseModule } from "@nestjs/mongoose";
import { TokenSchema } from "../../schemas/token.schema";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: "Token", schema: TokenSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, TokenService],
  exports: [JwtModule],
})
export class AuthModule {}
