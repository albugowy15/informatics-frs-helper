import { z } from "zod";

export const passwordSchema = z
  .string({ required_error: "Password wajib diisi" })
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]+$/gm, {
    message: "Password wajib terdiri dari huruf dan angka",
  })
  .min(8, { message: "Password minimal 8 karakter" })
  .max(16, { message: "Password maksimal 16 karakter" });

export const emailSchema = z
  .string({ required_error: "Email wajib diisi" })
  .email({ message: "Email harus valid" })
  .min(1, { message: "Email tidak boleh kosong" });

export const usernameSchema = z
  .string({ required_error: "Username wajib diisi" })
  .regex(/^\S+$/gm, {
    message: "Username tidak boleh terdapat spasi",
  })
  .min(1, { message: "Username tidak boleh kosong" })
  .max(20, { message: "Username maksimal 20 karakter" });

export const requiredSemesterStringSchema = z
  .string({ required_error: "Semester wajib diisi" })
  .min(1, { message: "Semester kosong" });
