 import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/users.module";
import { CategoriesModule } from "./modules/catedories/categories.module";
import { ProductsModule } from "./modules/products/products.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MailerModule } from "@nestjs-modules/mailer";
 import {ImageModule} from "./modules/image/image.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env["MONGO_URL"]),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
    UsersModule,
    CategoriesModule,
    ProductsModule,
    AuthModule,
    ImageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
