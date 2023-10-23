'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const changePasswordForm = z.object({
  old_password: z.string({
    required_error: 'Password lama tidak boleh kosong',
  }),
  new_password: z
    .string({ required_error: 'Password baru tidak boleh kosong' })
    .min(8)
    .max(16),
});

type CreatePasswordForm = z.infer<typeof changePasswordForm>;

const ChangePasswordForm = () => {
  const form = useForm<CreatePasswordForm>({
    resolver: zodResolver(changePasswordForm),
  });
  const { handleSubmit } = form;
  // const mutatePassword = api.user.changePassword.useMutation();
  const onSubmit: SubmitHandler<CreatePasswordForm> = (data) => {
    toast({
      title: 'Loading',
      description: 'Sedang mengubah password..',
    });
    // mutatePassword.mutate({
    //   new_password: data.new_password,
    //   old_password: data.old_password,
    // });
    // if (mutatePassword.isError) {
    //   toast({
    //     title: 'Error',
    //     description: mutatePassword.error?.message,
    //   });
    // }
    // if (mutatePassword.isSuccess) {
    //   toast({
    //     title: 'Success',
    //     description: 'Password berhasil diubah',
    //   });
    // }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='old_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password lama</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password lama' {...field} />
              </FormControl>
              <FormDescription>Masukkan password lama Anda</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='new_password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password baru</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password baru' {...field} />
              </FormControl>
              <FormDescription>Masukkan password baru Anda</FormDescription>
            </FormItem>
          )}
        />

        <Button
          className='flex w-full justify-center'
          type='submit'
          // disabled={mutatePassword.isLoading}
        >
          Ubah Password
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
