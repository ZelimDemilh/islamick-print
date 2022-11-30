import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserSchema } from "../../schemas/user.schema";
import { Model } from "mongoose";
import { CommonService } from "../../common/common.servise";

@Injectable()
export class UsersService extends CommonService<UserDocument> {
  constructor(@InjectModel("User") private userModel: Model<UserDocument>) {
    super(userModel);
  }

  async findByMail(mail) {
    const candidate = await this.model.findOne({ mail });
    if (!candidate) {
      return null;
    }
    return candidate;
  }

  async findByActivateLink(activationLink) {
    const candidate = await this.model.findOne({ activationLink });
    if (!candidate) {
      return null;
    }
    return candidate;
  }

  // async CreateUser( userDate: CreateUserDto) {
  //   const user = await this.userModel.create(userDate)
  //   return user
  // }
}
