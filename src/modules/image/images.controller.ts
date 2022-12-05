import {Controller, Get, Param, Res} from "@nestjs/common";

@Controller("/image")
export class ImagesController {
  @Get("/:imgPatch")
    getImage(@Param("imgPatch") image, @Res() res){
      return res.sendFile(image, {root: "uploads/productImg"})
  }

}

