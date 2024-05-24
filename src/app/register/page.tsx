import RegisterForm from "@/app/register/_components/register-form";
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
  title: renderPageTitle("Register"),
};

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Silahkan Register</CardTitle>
          <CardDescription>
            Silahkan register menggunakan email, username, dan password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
