import { DefaultSession } from 'next-auth';

import { LoginResponseData } from '@/pages/api/login';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: LoginResponseData & DefaultSession['user'];
  }
}
