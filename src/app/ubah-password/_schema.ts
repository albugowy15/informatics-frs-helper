import { passwordSchema } from "@/lib/schema";
import { z } from "zod";

export const changePasswordSchema = z.object({
  old_password: z
    .string({
      required_error: "Password lama tidak boleh kosong",
    })
    .min(1, { message: "Password lama wajib diisi" }),
  new_password: passwordSchema,
});
