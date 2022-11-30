import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import cors from "cors";

async function start() {
  const PORT = process.env.PORT || 5050;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors();

  await app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
}

start();
