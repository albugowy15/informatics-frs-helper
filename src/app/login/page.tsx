import { type Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/app/login/_components/login-form";
import { renderPageTitle } from "@/lib/utils";

export const metadata: Metadata = {
  title: renderPageTitle("Login"),
};

export default function LoginPage() {
  return (
    <Card className="mx-auto mt-6 w-full md:w-96">
      <CardHeader>
        <CardTitle>Silahkan Login</CardTitle>
        <CardDescription>
          Silahkan login menggunakan email atau username beserta password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
