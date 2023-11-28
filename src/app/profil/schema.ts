import { emailSchema, usernameSchema } from "@/lib/schema";
import { asOptionalField } from "@/lib/utils";
import { z } from "zod";

export const editProfileSchema = z.object({
  fullname: z.string().optional(),
  username: usernameSchema,
  email: emailSchema,
  idLine: asOptionalField(
    z.string().startsWith("@", { message: "Id Line ditulis dengan awalan @" }),
  ),
  whatsapp: asOptionalField(
    z
      .string()
      .min(9, { message: "No. Whatsapp minimal 9 angka" })
      .max(14, { message: "No. Whatsapp maksimal 9 angka" })
      .startsWith("08", { message: "No. Whatsapp tidak valid" })
      .regex(/^[0-9]*$/, { message: "No. Whatsapp tidak valid" }),
  ),
});
