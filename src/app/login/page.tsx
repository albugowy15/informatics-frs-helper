import { Metadata } from 'next';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import LoginForm from '@/app/login/components/login-form';
import { renderPageTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: renderPageTitle('Login'),
};

export default function LoginPage() {
  return (
    <Card className='md:w-96 mx-auto mt-6 w-full'>
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
