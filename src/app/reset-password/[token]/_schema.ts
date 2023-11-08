import { passwordSchema } from "@/lib/schema";
import { z } from "zod";

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
});
