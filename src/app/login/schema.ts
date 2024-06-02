import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username tidak boleh kosong",
      invalid_type_error: "Username tidak valid",
    })
    .min(1, { message: "Username tidak boleh kosong" }),
  password: z
    .string({
      required_error: "Password tidak boleh kosong",
      invalid_type_error: "Password tidak valid",
    })
    .min(1, { message: "Password tidak boleh kosong" }),
});
