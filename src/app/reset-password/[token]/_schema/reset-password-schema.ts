import { z } from "zod";

export const passwordSchema = z
  .string({
    required_error: "Password wajib diisi",
    invalid_type_error: "Password tidak valid",
  })
  .min(8, { message: "Password minimal 8 karakter" })
  .max(16, { message: "Password maksimal 16 karakter" });

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
});
