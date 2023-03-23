import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type DropdownProps = {
  options: React.ReactNode;
  menuButton: React.ReactNode;
};

export default function Dropdown({ options, menuButton }: DropdownProps) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center text-sm font-medium text-white'>
          {menuButton}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right overflow-hidden rounded-md bg-white p-1 ring-1 ring-neutral-800'>
          {options}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
