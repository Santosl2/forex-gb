import { ALLOWED_UPLOAD_TYPES, MAX_ALLOWED_FILE_SIZE } from "../constants";
import { yup } from "../utils/yup";

export const modalAddSchema = yup.object({
  amount: yup
    .string()
    .required()
    .test("minValue", "Min value is $500.00", (value) => {
      if (!value) return false;

      const onlyNumbers = parseFloat(value.replace(/[^.0-9]/g, ""));
      return onlyNumbers >= 500.0;
    }),
  voucherFile: yup
    .mixed()
    .required()
    .test(
      "fileType",
      "Please insert a valid file (.png, .jpg,.jpeg)",
      (value) => {
        if (
          typeof value === "string" &&
          value.toString().includes("data:image")
        )
          return true;

        return ALLOWED_UPLOAD_TYPES.includes(value?.[0].type) || false;
      }
    )
    .test("fileSize", "The file is too large", (value) => {
      return value?.[0]?.size <= MAX_ALLOWED_FILE_SIZE || true;
    }),
});
