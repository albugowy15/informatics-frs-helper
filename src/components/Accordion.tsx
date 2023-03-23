import { Disclosure } from '@headlessui/react';
import { ReactNode } from 'react';
import { BsChevronUp } from 'react-icons/bs';

type AccordionProps = {
  title: ReactNode;
  children: ReactNode;
};
const Accordion = ({ title, children }: AccordionProps) => {
  return (
    <div className='overflow-hidden rounded-lg border border-neutral-700'>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className='flex w-full border-collapse items-center justify-between rounded-lg border-b border-neutral-700 bg-white px-4 py-2 text-left hover:bg-neutral-900'>
              {title}
              <BsChevronUp
                className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className='px-2 py-2 text-sm text-gray-500'>
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Accordion;
