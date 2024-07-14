import LoginForm from "@/app/login/_components/login-form";
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
import * as React from "react";

export const metadata: Metadata = {
  title: renderPageTitle("Login"),
};

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center mt-6">
      <Card>
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
    </div>
  );
}
