import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { renderPageTitle } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: renderPageTitle("Profil"),
};

export default async function ProfilePage() {
  const userProfile = await api.user.getUserProfile();

  return (
    <Card className="mx-auto w-full min-w-fit sm:w-[500px]">
      <CardHeader>
        <CardTitle>Informasi Profil Akun</CardTitle>
        <CardDescription>
          Berikut adalah informasi lengkap terkait akun Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Typography
          variant="body1"
          className="flex items-center justify-between py-2 font-semibold"
        >
          Nama lengkap
          <span className="font-normal">{userProfile?.fullname}</span>
        </Typography>
        <Separator />
        <Typography
          variant="body1"
          className="flex items-center justify-between py-2 font-semibold"
        >
          Username
          <span className="font-normal">{userProfile?.username}</span>
        </Typography>
        <Separator />
        <Typography
          variant="body1"
          className="flex items-center justify-between py-2 font-semibold"
        >
          Email
          <span className="font-normal">{userProfile?.email}</span>
        </Typography>
        <Separator />
        <Typography
          variant="body1"
          className="flex items-center justify-between py-2 font-semibold"
        >
          ID Line
          <span className="font-normal">{userProfile?.idLine}</span>
        </Typography>
        <Separator />
        <Typography
          variant="body1"
          className="flex items-center justify-between py-2 font-semibold"
        >
          No. WA
          <span className="font-normal">{userProfile?.whatsapp}</span>
        </Typography>
        <Separator />
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button asChild>
          <Link href="/profil/edit">
            <Pencil1Icon className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
