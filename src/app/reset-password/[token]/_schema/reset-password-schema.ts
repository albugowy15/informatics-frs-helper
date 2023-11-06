import { registerSchema } from "@/app/register/_schema/register-schema";
import { z } from "zod";

export const resetPasswordSchema = z.object({
  newPassword: registerSchema.shape.password,
});
