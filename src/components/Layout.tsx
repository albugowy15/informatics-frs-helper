import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiOutlineHome, AiOutlineSchedule } from 'react-icons/ai';
import {
  BsBook,
  BsFillPersonFill,
  BsLockFill,
  BsNewspaper,
  BsPersonCircle,
} from 'react-icons/bs';
import { CgMenuGridR } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { TbArrowsExchange2 } from 'react-icons/tb';

import BasicLink from '@/components/BasicLink';
import { Button, LinkButton } from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <header className='w-full bg-white'>
        <div className='container mx-auto flex items-center justify-between py-2 px-3'>
          <BasicLink href='/' className='text-base font-bold md:text-xl'>
            TC FRS Helper
          </BasicLink>
          <nav className='flex items-center gap-2'>
            <Button
              variant='outlined'
              icon={CgMenuGridR}
              onClick={() => setOpenMenu(true)}
            >
              Menu
            </Button>
            {status == 'loading' ? (
              <Loader />
            ) : (
              <>
                {session?.user ? (
                  <>
                    <Dropdown
                      menuButton={
                        <div className='flex h-fit items-center justify-center rounded-full border border-neutral-400 p-2.5 hover:bg-neutral-900'>
                          <BsFillPersonFill className='text-base text-primary-400' />
                        </div>
                      }
                      options={
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <BasicLink
                                className={clsx(
                                  'flex w-full items-center gap-3 rounded px-2 py-1.5 ',
                                  [
                                    active
                                      ? 'bg-primary-500 text-neutral-50'
                                      : 'text-neutral-200',
                                  ]
                                )}
                                href={'/profile/' + session.user.id}
                              >
                                <BsPersonCircle
                                  className={clsx([
                                    active ? 'text-white' : 'text-primary-500',
                                  ])}
                                />
                                Profil
                              </BasicLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <BasicLink
                                className={clsx(
                                  'flex w-full items-center gap-3 rounded px-2 py-1.5 ',
                                  [
                                    active
                                      ? 'bg-primary-500 text-neutral-50'
                                      : 'text-neutral-200',
                                  ]
                                )}
                                href={'/ubah-password/' + session.user.id}
                              >
                                <BsLockFill
                                  className={clsx([
                                    active ? 'text-white' : 'text-primary-500',
                                  ])}
                                />
                                Ubah Password
                              </BasicLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <BasicLink
                                className={clsx(
                                  'flex w-full items-center gap-3 rounded px-2 py-1.5 ',
                                  [
                                    active
                                      ? 'bg-primary-500 text-neutral-50'
                                      : 'text-neutral-200',
                                  ]
                                )}
                                href={'/frs/' + session.user.id}
                              >
                                <BsNewspaper
                                  className={clsx([
                                    active ? 'text-white' : 'text-primary-500',
                                  ])}
                                />
                                myFRS
                              </BasicLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <BasicLink
                                className={clsx(
                                  'flex w-full items-center gap-3 rounded px-2 py-1.5 ',
                                  [
                                    active
                                      ? 'bg-primary-500 text-neutral-50'
                                      : 'text-neutral-200',
                                  ]
                                )}
                                href={'/my-trading-matkul/' + session.user.id}
                              >
                                <TbArrowsExchange2
                                  className={clsx([
                                    active ? 'text-white' : 'text-primary-500',
                                  ])}
                                />
                                myTradeMatkul
                              </BasicLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => signOut()}
                                className={clsx(
                                  'flex w-full items-center gap-3 rounded px-2 py-1.5 ',
                                  [
                                    active
                                      ? 'bg-primary-500 text-neutral-50'
                                      : 'text-neutral-200',
                                  ]
                                )}
                              >
                                <FiLogOut
                                  className={clsx([
                                    active ? 'text-white' : 'text-primary-500',
                                  ])}
                                />
                                Logout
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      }
                    />
                  </>
                ) : (
                  <Button variant='filled' onClick={() => signIn()}>
                    Login
                  </Button>
                )}
              </>
            )}
          </nav>
        </div>
      </header>
      <Modal isOpen={openMenu} setIsOpen={setOpenMenu} title='Menu Navigation'>
        <div className='py-2'>
          <Typography variant='body1' className='text-neutral-400'>
            Berikut daftar menu yang dapat kamu akses
          </Typography>
          <div className='flex w-full flex-col divide-y divide-neutral-700 py-2 text-neutral-100'>
            <BasicLink
              onClick={() => setOpenMenu(false)}
              href='/'
              className='flex items-center gap-3 py-3 hover:text-primary-400'
            >
              <AiOutlineHome className='text-lg' />
              Home
            </BasicLink>
            <BasicLink
              onClick={() => setOpenMenu(false)}
              href='/panduan'
              className='flex items-center gap-3 py-3 hover:text-primary-400'
            >
              <BsBook className='text-lg' />
              Panduan
            </BasicLink>
            <BasicLink
              onClick={() => setOpenMenu(false)}
              className='flex items-center gap-3 py-3 hover:text-primary-400'
              href='/jadwal'
            >
              <AiOutlineSchedule className='text-lg' />
              Jadwal Matkul
            </BasicLink>
            <BasicLink
              onClick={() => setOpenMenu(false)}
              className='flex items-center gap-3 py-3 hover:text-primary-400'
              href='/trading-matkul'
            >
              <TbArrowsExchange2 className='text-lg' />
              Trading Matkul
            </BasicLink>
          </div>
          <div className=' flex items-center justify-between'>
            <LinkButton href='/report' variant='outlined'>
              Report
            </LinkButton>
            <Button variant='filled' onClick={() => setOpenMenu(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
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
