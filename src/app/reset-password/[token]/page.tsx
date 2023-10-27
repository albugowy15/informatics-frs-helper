import { Metadata } from 'next';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ResetPasswordForm from '@/app/reset-password/[token]/_components/reset-password-form';
import { renderPageTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: renderPageTitle('Reset Password'),
};

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <Card className='mx-auto mt-6 w-full md:w-96'>
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
