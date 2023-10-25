import { Metadata } from 'next';

import { renderPageTitle } from '@/utils/page';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ResetPasswordForm from '@/app/reset-password/[token]/components/reset-password-form';

export const metadata: Metadata = {
  title: renderPageTitle('Reset Password'),
};
export default function ResetPasswordPage() {
  return (
    <Card className='mx-auto mt-6 w-full md:w-96'>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Silahkan buat password baru Anda</CardDescription>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
