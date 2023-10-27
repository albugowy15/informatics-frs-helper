import { Metadata } from 'next';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import RegisterForm from '@/app/register/_components/register-form';
import { renderPageTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: renderPageTitle('Register'),
};

export default function RegisterPage() {
  return (
    <Card className='mx-auto mt-6 md:w-96 w-full'>
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
  );
}
