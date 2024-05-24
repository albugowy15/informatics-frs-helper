import ChangePasswordForm from "@/app/ubah-password/_components/change-password-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { renderPageTitle } from "@/lib/utils";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: renderPageTitle("Ubah Password"),
};

export default function ChangePasswordPage() {
  return (
    <div className="flex items-center justify-center mt-6">
      <Card className="w-full sm:min-w-[400px] sm:w-auto">
        <CardHeader>
          <CardTitle>Silahkan Ubah Password Anda</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
