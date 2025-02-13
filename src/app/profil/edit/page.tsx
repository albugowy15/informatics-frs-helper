import EditProfileForm from "@/app/profil/edit/_components/edit-profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: renderPageTitle("Edit Profil"),
};

export default async function EditProfilePage() {
  const userProfile = await api.user.getUserProfile();

  return (
    <Card className="mx-auto w-full min-w-fit sm:w-[500px]">
      <CardHeader>
        <CardTitle>Edit Profil Akun</CardTitle>
        <CardDescription>Silahkan edit profil akun Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <EditProfileForm userProfile={userProfile} />
      </CardContent>
    </Card>
  );
}
