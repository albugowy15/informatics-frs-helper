import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

import { api } from '@/trpc/react';

const resetPasswordSchema = z.object({
  newPassword: z
    .string({
      required_error: 'Password wajib diisi',
      invalid_type_error: 'Password tidak valid',
    })
    .min(8, { message: 'Password minimal 8 karakter' })
    .max(16, { message: 'Password maksimal 16 karakter' }),
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const router = useRouter();
  const { handleSubmit } = form;
  const mutateResetPassword = api.user.verifyResetPassword.useMutation();
  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    const token = router.query.token as string;
    mutateResetPassword
      .mutateAsync({
        token: token,
        newPassword: data.newPassword,
      })
      .then((res) => {
        if (res) {
          toast({
            title: 'Success',
            description: 'Password berhasil diperbarui',
          });
        }
      })
      .catch((err) => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message,
        });
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormDescription>Masukkan password baru Anda</FormDescription>
              <Input {...field} placeholder='password' />
            </FormItem>
          )}
        />

        <Button
          className='flex w-full justify-center'
          type='submit'
          disabled={mutateResetPassword.isLoading}
        >
          {mutateResetPassword.isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait..
            </>
          ) : (
            <>Perbarui Password</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
