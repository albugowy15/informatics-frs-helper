import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "Username wajib diisi" })
    .regex(/^\S+$/gm, {
      message: "Username tidak boleh terdapat spasi",
    })
    .min(1, { message: "Username tidak boleh kosong" })
    .max(20, { message: "Username maksimal 20 karakter" }),
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email({ message: "Email harus valid" })
    .min(1, { message: "Email tidak boleh kosong" }),
  password: z
    .string({ required_error: "Password wajib diisi" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]+$/gm, {
      message: "Password wajib terdiri dari huruf dan angka",
    })
    .min(8, { message: "Password minimal 8 karakter" })
    .max(16, { message: "Password maksimal 16 karakter" }),
  confirmPassword: z
    .string({ required_error: "Konfirmasi password wajib diisi" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]+$/gm, {
      message: "Password wajib terdiri dari huruf dan angka",
    })
    .min(8, { message: "Password minimal 8 karakter" })
    .max(16, { message: "Password maksimal 16 karakter" }),
});
