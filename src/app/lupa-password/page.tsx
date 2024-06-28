import ForgotPasswordForm from "@/app/lupa-password/_components/forgot-password-form";
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
  title: renderPageTitle("Lupa Password"),
};

export default async function ForgotPasswordPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Lupa Password</CardTitle>
          <CardDescription>
            Link untuk reset password akan dikirimkan ke emailmu. Cek juga di
            spam atau promosi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
