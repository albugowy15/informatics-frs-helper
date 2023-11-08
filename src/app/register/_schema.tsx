import { emailSchema, passwordSchema, usernameSchema } from "@/lib/schema";
import { z } from "zod";

export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
});
