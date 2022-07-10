import { ALLOWED_UPLOAD_TYPES, MAX_ALLOWED_FILE_SIZE } from "../constants";
import { yup } from "../utils/yup";

export const modalAddSchema = yup.object({
  amount: yup.string().required(),
  voucher: yup
    .mixed()
    .test(
      "fileType",
      "Please insert a valid file (.png, .jpg,.jpeg)",
      (value) => {
        if (value[0] instanceof File) {
          return ALLOWED_UPLOAD_TYPES.includes(value[0].type);
        }
        return false;
      }
    )
    .test("fileSize", "The file is too large", (value) => {
      return value[0]?.size <= MAX_ALLOWED_FILE_SIZE;
    }),
});
