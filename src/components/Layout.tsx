import { signIn, signOut, useSession } from 'next-auth/react';

import BasicLink from '@/components/BasicLink';
import { Button, LinkButton } from '@/components/Button';
import Typography from '@/components/Typography';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className='w-full bg-white'>
      <div className='container mx-auto flex items-center justify-between py-2 px-3'>
        <BasicLink href='/' className='text-base font-bold md:text-xl'>
          TC FRS Helper
        </BasicLink>
        <nav className='flex justify-between gap-2'>
          {session?.user ? (
            <>
              <Typography variant='body1'>{session.user.username}</Typography>
              <Button variant='filled' onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant='filled' onClick={() => signIn()}>
                Login
              </Button>
              <LinkButton variant='outlined' href='/register'>
                Register
              </LinkButton>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className='mt-auto w-full bg-white'>
      <Typography
        variant='label2'
        className='py-2 text-center text-neutral-400'
      >
        Copyright 2023 - Mohamad Kholid Bughowi
      </Typography>
    </footer>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <div className='container mx-auto px-3'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
