export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/my-frs/:path*',
    '/profil/:path*',
    '/ubah-password/:path*',
    '/my-trade-matkul/:path*',
  ],
};
