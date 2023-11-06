import { z } from "zod";

export const changePasswordSchema = z.object({
  old_password: z
    .string({
      required_error: "Password lama tidak boleh kosong",
    })
    .min(1, { message: "Password lama wajib diisi" }),
  new_password: z
    .string({ required_error: "Password baru wajib diisi" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]+$/gm, {
      message: "Password baru wajib terdiri dari huruf dan angka",
    })
    .min(8, { message: "Password baru minimal 8 karakter" })
    .max(16, { message: "Password baru maksimal 16 karakter" }),
});
