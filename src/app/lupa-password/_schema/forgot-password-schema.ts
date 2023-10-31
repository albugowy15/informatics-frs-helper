import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email tidak boleh kosong",
      invalid_type_error: "Email tidal valid",
    })
    .email({ message: "Email tidak valid" })
    .min(1, { message: "Email tidak boleh kosong" }),
});
