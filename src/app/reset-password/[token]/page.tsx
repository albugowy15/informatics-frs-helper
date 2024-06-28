import ResetPasswordForm from "@/app/reset-password/[token]/_components/reset-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderPageTitle } from "@/lib/utils";
import { auth } from "auth";
import { type Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: renderPageTitle("Reset Password"),
};

export default async function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <Card className="mx-auto mt-6 w-full md:w-96">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Silahkan buat password baru Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm token={params.token} />
      </CardContent>
    </Card>
  );
}
