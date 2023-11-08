import { emailSchema } from "@/lib/schema";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
