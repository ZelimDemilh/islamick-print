import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
  constructor(private userService: UsersService) {}

  // @Post("/create")
  // create(@Body() userDto: CreateUserDto){
  //   return this.userService.CreateUser(userDto)
  // }
}
