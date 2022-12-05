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
import { CreateProductsDto, UpdateProductsDto } from "./products.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "../../common/strogeFileInterceptor";
import {AdminGuard} from "../auth/admin.guard";

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

  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor("img", storage))
  @Post("/create")
  createProduct(@Body() productDto: CreateProductsDto, @UploadedFile() file) {
    return this.productsService.save({ ...productDto, image: `/image/${file.name}` });
  }

  @UseGuards(AdminGuard)
  @Delete("/remove/:id")
  removeProduct(@Param("id") id: string) {
    return this.productsService.delete(id);
  }

  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor("img", storage))
  @Patch("/patch/:id")
  patchProduct(
    @Param("id") id: string,
    @Body() updateDate: UpdateProductsDto,
    @UploadedFile() file
  ) {
    return this.productsService.update(id, { ...updateDate, image: `/image/${file.name}` });
  }
}
