export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/frs/:path*',
    '/profile/:path*',
    '/ubah-password/:path*',
    '/my-trading-matkul/:path*',
  ],
};
