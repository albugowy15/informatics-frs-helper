import { Metadata } from 'next';

import { renderPageTitle } from '@/utils/page';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import ChangePasswordForm from '@/app/ubah-password/components/change-password-form';

export const metadata: Metadata = {
  title: renderPageTitle('Ubah Password'),
};

export default function ChangePasswordPage() {
  return (
    <>
      <Card className='mx-auto mt-6 w-full md:w-96'>
        <CardHeader>
          <CardTitle>Silahkan Ubah Password Anda</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </>
  );
}