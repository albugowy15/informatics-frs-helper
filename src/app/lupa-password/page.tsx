import { Metadata } from 'next';

import { renderPageTitle } from '@/utils/page';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ForgotPasswordForm from '@/app/lupa-password/components/forgot-password-form';

export const metadata: Metadata = {
  title: renderPageTitle('Lupa Password'),
};

export default function ForgotPasswordPage() {
  return (
    <Card className='mx-auto mt-6 w-full md:w-96'>
      <CardHeader>
        <CardTitle>Lupa Password</CardTitle>
        <CardDescription>
          Link untuk reset password akan dikirimkan ke emailmu. Cek juga di spam
          atau promosi.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}
