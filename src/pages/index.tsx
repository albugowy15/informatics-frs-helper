import { useSession } from 'next-auth/react';

import { api } from '@/utils/api';

export default function Home() {
  const { data: session } = useSession();
  const greeting = api.example.getSecretMessage.useQuery();
  if (greeting) {
    console.log('test', greeting.data);
  }
  if (greeting.isLoading) {
    return <>Loading...</>;
  }
  if (greeting.isError) {
    return <>Error</>;
  }
}
