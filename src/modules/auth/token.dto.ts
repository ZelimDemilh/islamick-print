import { UserDocument } from "../../schemas/user.schema";

export class CreateToken{
  mail;
  id;
  isActivated;
  role;

  constructor(model: UserDocument) {
    this.mail = model.mail;
    this.id = model._id;
    this.isActivated = model.isActivated
    this.role = model.role
  }

}

export class CreateTokens {
  accessToken: string;
  refreshToken: string
}