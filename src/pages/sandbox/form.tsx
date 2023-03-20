import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { SelectInput, TextInput } from '@/components/Form';

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Nama tidak boleh kosong',
    })
    .min(3, { message: 'Nama minimal 3 karakter' })
    .max(10, { message: 'Nama maksimal 10 karakter' }),
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z
    .string({
      required_error: 'Password tidak boleh kosong',
    })
    .min(8, { message: 'Password minimal 8 karakter' })
    .max(20, { message: 'Password maksimal 20 karakter' }),
});

type Person = z.infer<typeof formSchema>;

export default function FormPage() {
  const methods = useForm<Person>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: Person) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const selectData = ['Budi susilo', 'Joko susilo', 'Ahmad susilo'];
  return (
    <div className='w-[400px] px-10'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label='Nama'
            name='name'
            helperText='tes helper text'
            placeholder='halo'
          />
          <TextInput label='Email' name='email' helperText='tes helper text' />
          <TextInput label='Password' name='password' type='password' />
          <Button variant='filled' type='submit'>
            Submit
          </Button>
        </form>
      </FormProvider>
      <SelectInput data={selectData} />
    </div>
  );
}
