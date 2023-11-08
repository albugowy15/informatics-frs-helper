import { z } from "zod";

export const titleSchema = z
  .string({
    required_error: "Judul rencana FRS tidak boleh kosong",
  })
  .min(1, { message: "Judul rencana FRS tidak boleh kosong" })
  .max(20, { message: "Judul rencana FRS maksimal 20 karakter" });

export const matkulSchema = z.string().optional();
