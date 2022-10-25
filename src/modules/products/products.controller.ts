import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateCategory, UpdateCategory } from "../catedories/categories.dto";
import { CreateProductsDto, UpdateProductsDto } from "./products.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as uuid from "uuid";
import * as path from "path";

const storage = {
  storage: diskStorage({
    destination: "./uploads/productImg",
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, "") + uuid.v4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
}

@Controller("/products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get("/list")
  getListProducts() {
    return this.productsService.getList();
  }

  @Get("/:id")
  getProduct(@Param("id") id: string) {
    return this.productsService.getOnly(id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor("img", storage  )
  )
  @Post("/create")
  createProduct(
    @Body() productDto: CreateProductsDto,
    @UploadedFile() file
  ) {
    console.log(file);
    console.log(productDto);
    return this.productsService.save({ ...productDto, image: file.path });
  }

  @UseGuards(AuthGuard)
  @Delete("/remove/:id")
  removeProduct(@Param("id") id: string) {
    return this.productsService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Patch("/patch/:id")
  patchProduct(@Param("id") id: string, @Body() updateDate: UpdateProductsDto) {
    return this.productsService.update(id, updateDate);
  }
}
