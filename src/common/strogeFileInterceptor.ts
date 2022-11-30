import { diskStorage } from "multer";
import * as uuid from "uuid";
import * as path from "path";

export const storage = {
  storage: diskStorage({
    destination: "./uploads/productImg",
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, "") + uuid.v4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};




