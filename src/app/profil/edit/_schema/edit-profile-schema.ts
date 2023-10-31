import { asOptionalField } from "@/lib/utils";
import { z } from "zod";

export const editProfileSchema = z.object({
  fullname: z.string().optional(),
  username: z
    .string({ required_error: "Username wajib diisi" })
    .min(6, { message: "Username minimal 6 karakter" })
    .max(12, { message: "Username maksimal 12 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  idLine: asOptionalField(
    z.string().startsWith("@", { message: "Id Line ditulis dengan awalan @" }),
  ),
  whatsapp: asOptionalField(
    z
      .string()
      .min(9, { message: "No. Whatsapp minimal 9 angka" })
      .max(14, { message: "No. Whatsapp maksima 9 angka" })
      .startsWith("08", { message: "No. Whatsapp tidak valid" })
      .regex(/^[0-9]*$/, { message: "No. Whatsapp tidak valid" }),
  ),
});
