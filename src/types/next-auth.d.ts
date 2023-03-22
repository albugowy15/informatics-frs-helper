import { LoginResponseData } from '@/pages/api/login';

declare module 'next-auth' {
  interface Session {
    user: LoginResponseData;
  }
}
