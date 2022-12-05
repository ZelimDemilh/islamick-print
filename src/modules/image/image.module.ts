import { Module } from "@nestjs/common";
import {ImagesController} from "./images.controller";

@Module({
  imports: [],
  controllers: [
      ImagesController
  ],
  providers: [],
})
export class ImageModule {}
