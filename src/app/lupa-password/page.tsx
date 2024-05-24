import ForgotPasswordForm from "@/app/lupa-password/_components/forgot-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderPageTitle } from "@/lib/utils";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: renderPageTitle("Lupa Password"),
};

export default function ForgotPasswordPage() {
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
