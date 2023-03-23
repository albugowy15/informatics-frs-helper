import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IconType } from 'react-icons';

import Typography from '@/components/Typography';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title?: string;
  centerTitle?: boolean;
  icon?: IconType;
};

const Modal = ({
  children,
  isOpen,
  setIsOpen,
  title,
  centerTitle = false,
  icon: Icon,
}: ModalProps) => {
  return (
    <Transition show={isOpen} appear as={Fragment}>
      <Dialog
        as='div'
        onClose={() => setIsOpen(false)}
        className='relative z-10'
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-xl border border-neutral-600 bg-white p-6 text-left align-middle transition-all'>
                {Icon && (
                  <Icon className='mx-auto mb-4 text-secondary-600' size={30} />
                )}
                <Dialog.Title as='h4'>
                  <Typography
                    variant='h4'
                    className={centerTitle ? 'text-center' : 'text-left'}
                  >
                    {title}
                  </Typography>
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
