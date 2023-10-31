import { z } from "zod";

export const changePasswordSchema = z.object({
  old_password: z.string({
    required_error: "Password lama tidak boleh kosong",
  }),
  new_password: z
    .string({ required_error: "Password baru tidak boleh kosong" })
    .min(8)
    .max(16),
});
