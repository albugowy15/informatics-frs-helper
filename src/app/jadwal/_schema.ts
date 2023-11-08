import { z } from "zod";

export const filterSchema = z.object({
  semester: z
    .string({
      required_error: "Silahkan pilih semester",
      invalid_type_error: "Semester bertipe string",
    })
    .min(1, { message: "Silahkan pilih semester" }),
  matkul: z.string().optional(),
});
