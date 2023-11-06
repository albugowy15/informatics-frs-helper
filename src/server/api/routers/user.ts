import { TRPCError } from "@trpc/server";
import { kv } from "@vercel/kv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

import { env } from "@/env.mjs";
import { registerSchema } from "@/app/register/_schema/register-schema";
import { changePasswordSchema } from "@/app/ubah-password/_schema/change-password-schema";
import { editProfileSchema } from "@/app/profil/edit/_schema/edit-profile-schema";
import { forgotPasswordSchema } from "@/app/lupa-password/_schema/forgot-password-schema";
import { resetPasswordSchema } from "@/app/reset-password/[token]/_schema/reset-password-schema";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      if (input.password !== input.confirmPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password dan konfirmasi password tidak sama",
        });
      }
      const hashedPassword = await bcrypt.hash(input.password, 10);
      try {
        const user = await prisma.user.create({
          data: {
            username: input.username,
            email: input.email,
            password: hashedPassword,
          },
        });

        return {
          data: {
            id: user.id,
          },
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username atau email telah digunakan",
        });
      }
    }),
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    const userProfile = await prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        email: true,
        fullname: true,
        idLine: true,
        username: true,
        whatsapp: true,
      },
    });
    if (!userProfile) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User tidak ditemukan",
      });
    }
    return userProfile;
  }),
  updateProfile: protectedProcedure
    .input(editProfileSchema)
    .mutation(async ({ input, ctx }) => {
      const updatedProfile = await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          fullname: input.fullname,
          username: input.username,
          email: input.email,
          idLine: input.whatsapp ?? null,
          whatsapp: input.idLine ?? null,
        },
      });
      return updatedProfile.id;
    }),
  changePassword: protectedProcedure
    .input(changePasswordSchema)
    .mutation(async ({ input, ctx }) => {
      const oldPassword = await prisma.user.findUnique({
        select: {
          password: true,
        },
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!oldPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password lama salah",
        });
      }
      const match = await bcrypt.compare(
        input.old_password,
        oldPassword.password,
      );
      if (!match) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Password lama salah",
        });
      }
      const hashNewPassword = await bcrypt.hash(input.new_password, 10);
      const changePassword = await prisma.user.update({
        select: {
          id: true,
        },
        where: {
          id: ctx.session.user.id,
        },
        data: {
          password: hashNewPassword,
        },
      });
      return changePassword;
    }),
  resetPassword: publicProcedure
    .input(forgotPasswordSchema)
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          username: true,
          email: true,
        },
        where: {
          email: input.email,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User tidak ditemukan",
        });
      }
      const savedTimeRedis = await kv.get<string>(user.id);
      if (savedTimeRedis) {
        const currentTime = new Date();
        const savedTime = new Date(savedTimeRedis);

        const difference = currentTime.getTime() - savedTime.getTime();
        const fiveMinsMS = 5 * 60 * 1000;

        if (difference < fiveMinsMS) {
          const nextAttemptMn = Math.ceil(
            (fiveMinsMS - difference) / (1000 * 60),
          );
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: `Tunggu ${nextAttemptMn} menit lagi untuk mengirim link reset password berikutnya`,
          });
        }
      }

      const payload = {
        userId: user.id,
        username: user.username,
      };
      const token = jwt.sign(payload, env.RESET_SECRET, {
        expiresIn: "30m",
      });
      const tokenUrl = `${env.BASE_URL}/reset-password/${token}`;

      const resend = new Resend(env.RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: "TC FRS Helper <no-reply@tc-frs-helper.live>",
          to: [user.email],
          subject: "Permintaan Reset Password - TC FRS Helper",
          html: `
          <h1>Konfirmasi Reset Password</h1>
          <p>Hallo <strong>${user.username}</strong></p>
          <br/>
          <p>Kamu telah meminta untuk reset password. Silahkan klik link berikut untuk mereset password kamu</p>
          <br />
          <a href='${tokenUrl}' target='_blank' rel='noopener noreferrer'>${tokenUrl}</a>
          <br /><br />
          <p>Mohon jangan menunjukkan email ataupun link reset password di atas kesiapapun. Terima kasih</p>`,
        });
        const currentTime = new Date();
        try {
          await kv.set(user.id, currentTime.toISOString());
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        }
        return {
          message: "Email reset password berhasil dikirim",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gagal mengirimkan email reset password",
        });
      }
    }),
  verifyResetPassword: publicProcedure
    .input(
      z.object({
        token: z.string().min(1, { message: "Reset password token kosong" }),
        newPassword: resetPasswordSchema.shape.newPassword,
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const decoded = jwt.verify(input.token, env.RESET_SECRET) as {
          userId: string;
          username: string;
        };
        const userId = decoded.userId;
        const username = decoded.username;
        const user = await prisma.user.findUnique({
          select: {
            id: true,
            username: true,
            email: true,
          },
          where: {
            id: userId,
          },
        });
        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User tidak ditemukan",
          });
        }
        if (user.username !== username) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Token tidak valid",
          });
        }
        try {
          const hashNewPassword = await bcrypt.hash(input.newPassword, 10);
          await prisma.user.update({
            select: {
              id: true,
            },
            where: {
              id: userId,
            },
            data: {
              password: hashNewPassword,
            },
          });
          return {
            message: "Password berhasil diubah",
          };
        } catch (e) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Gagal mengubah password",
          });
        }
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token tidak valid",
        });
      }
    }),
});
