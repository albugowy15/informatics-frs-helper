/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import { z } from 'zod';

import { prisma } from '@/server/db';

import { api } from '@/utils/api';
import { renderPageTitle } from '@/utils/page';

import { Button } from '@/components/Button';
import Typography from '@/components/Typography';

import HasMatkulSection from '@/ui/trading-matkul/HasMatkulSection';
import SearchMatkulSection from '@/ui/trading-matkul/SearchMatkulSection';

const editTradeMatkulFormSchema = z.object({
  hasMatkul: z.string(),
  hasClass: z
    .string({ required_error: 'Pilih kelas yang kamu miliki' })
    .nonempty({
      message: 'Pilih kelas yang kamu miliki',
    }),
  hasMatkulSemester: z.string(),
  searchMatkul: z.string(),
  searchClass: z
    .string({ required_error: 'Pilih kelas yang kamu cari' })
    .nonempty({
      message: 'Pilih kelas yang kamu cari',
    }),
  searchMatkulSemester: z.string(),
  description: z
    .string({ required_error: 'Deskripsi tidak boleh kosong' })
    .max(150, { message: 'Deskripsi tidak boleh lebih dari 150 karakter' })
    .nonempty({ message: 'Deskripsi tidak boleh kosong' }),
});

export type EditTradeMatkulFormSchema = z.infer<
  typeof editTradeMatkulFormSchema
>;

type ClassInMatkul = {
  code: string;
  id: string;
  Matkul: {
    id: string;
    name: string;
    semester: number;
  };
};

type TradeMatkulPostProps = {
  hasMatkul: ClassInMatkul;
  searchMatkul: ClassInMatkul;
  description: string;
  id: string;
};

type CreateTradeMatkulPageProps = {
  tradeMatkulPost: TradeMatkulPostProps;
  classOptions: {
    listSemester: {
      id: number;
      semester: number;
    }[];
    listSubject: {
      id: string;
      matkul: string;
      semesterId: number;
    }[];
    listClass: {
      id: string;
      class: string;
      matkulId: string;
    }[];
  };
};

export default function CreateTradeMatkulPage({
  tradeMatkulPost,
  classOptions,
}: CreateTradeMatkulPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const methods = useForm<EditTradeMatkulFormSchema>({
    resolver: zodResolver(editTradeMatkulFormSchema),
    defaultValues: {
      hasMatkul: tradeMatkulPost.hasMatkul.id,
      searchClass: tradeMatkulPost.searchMatkul.id,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const updateTradeMatkul = api.tradeMatkul.updateTradeMatkul.useMutation({
    onSuccess() {
      router.push('/my-trading-matkul/');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<EditTradeMatkulFormSchema> = (data) => {
    toast.promise(
      updateTradeMatkul.mutateAsync({
        description: data.description,
        hasClassId: data.hasClass,
        searchClassId: data.searchClass,
        tradeMatkulId: id as string,
      }),
      {
        loading: 'Update post trade matkul',
        success: 'Berhasil update post trade matkul',
        error: (err) => err.message,
      },
    );
  };

  return (
    <>
      <NextSeo title={renderPageTitle('Edit myTradeMatkul')} />
      <FormProvider {...methods}>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-3 md:flex-row md:justify-between'>
            <HasMatkulSection
              data={classOptions}
              defaultValue={{
                class: tradeMatkulPost.hasMatkul.id,
                matkul: tradeMatkulPost.hasMatkul.Matkul.id,
                semester: tradeMatkulPost.hasMatkul.Matkul.semester.toString(),
              }}
            />
            <SearchMatkulSection
              data={classOptions}
              defaultValue={{
                class: tradeMatkulPost.searchMatkul.id,
                matkul: tradeMatkulPost.searchMatkul.Matkul.id,
                semester:
                  tradeMatkulPost.searchMatkul.Matkul.semester.toString(),
              }}
            />
          </div>

          <div className='py-2' />

          <Typography variant='h5'>Deskripsi</Typography>
          <Typography variant='body2'>
            Tulis deskripsi semenarik mungkin, biar ada yang mau nuker..
          </Typography>
          <Typography variant='body2'>Maksimal 150 karakter</Typography>
          <textarea
            {...register('description')}
            defaultValue={tradeMatkulPost.description}
            className='form-textarea mt-1 w-full rounded-md'
            rows={3}
            placeholder='Plisss... yang mau nuker dapat pahala'
          />
          {errors.description && (
            <Typography variant='label2' className='text-error-500'>
              {errors.description.message}
            </Typography>
          )}
          <div className='py-4' />
          <div className='flex items-center gap-4'>
            <Button
              variant='filled'
              icon={FaSave}
              type='submit'
              disabled={updateTradeMatkul.isLoading}
            >
              Simpan
            </Button>
            <Button
              variant='outlined'
              disabled={updateTradeMatkul.isLoading}
              onClick={() => router.back()}
            >
              Batal
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params) {
    return {
      notFound: true,
    };
  }
  const tradeMatkulPost = await prisma.tradeMatkul.findUnique({
    where: {
      id: context.params.id as string,
    },
    select: {
      id: true,
      description: true,
      hasMatkul: {
        select: {
          Matkul: {
            select: {
              id: true,
              name: true,
              semester: true,
            },
          },
          id: true,
          code: true,
        },
      },
      searchMatkul: {
        select: {
          Matkul: {
            select: {
              name: true,
              id: true,
              semester: true,
            },
          },
          id: true,
          code: true,
        },
      },
      userId: true,
    },
  });

  if (!tradeMatkulPost) {
    return {
      notFound: true,
    };
  }

  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (tradeMatkulPost.userId !== session.user.id) {
    return {
      redirect: {
        destination: '/403',
        permanent: false,
      },
    };
  }

  const listSemester = [
    { id: 1, semester: 1 },
    { id: 2, semester: 2 },
    { id: 3, semester: 3 },
    { id: 4, semester: 4 },
    { id: 5, semester: 5 },
    { id: 6, semester: 6 },
    { id: 7, semester: 7 },
    { id: 8, semester: 8 },
  ];

  const listSubject = await prisma.matkul
    .findMany({
      select: {
        id: true,
        name: true,
        semester: true,
      },
    })
    .then((res) => {
      return res.map((item) => {
        return {
          id: item.id,
          matkul: item.name,
          semesterId: item.semester,
        };
      });
    });

  const listClass = await prisma.class
    .findMany({
      select: {
        id: true,
        code: true,
        matkulId: true,
      },
    })
    .then((res) => {
      return res.map((item) => {
        return {
          id: item.id,
          class: item.code,
          matkulId: item.matkulId,
        };
      });
    });

  return {
    props: {
      tradeMatkulPost,
      classOptions: {
        listSemester,
        listClass,
        listSubject,
      },
    },
  };
}
