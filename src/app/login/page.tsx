import LoginForm from "@/app/login/_components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderPageTitle } from "@/lib/utils";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: renderPageTitle("Login"),
};

export default function LoginPage() {
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
