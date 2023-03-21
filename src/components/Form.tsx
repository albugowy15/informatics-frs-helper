import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsCheck2, BsChevronExpand } from 'react-icons/bs';
import { HiExclamationCircle } from 'react-icons/hi';

import Typography from '@/components/Typography';

type TextInputProps = {
  label: string;
  name: string;
  type?: 'text' | 'password';
  helperText?: string;
  placeholder?: string;
};

export const TextInput = ({
  label,
  name,
  type = 'text',
  helperText,
  placeholder,
}: TextInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='flex flex-col py-2'>
      <Typography variant='label1'>{label}</Typography>
      <Typography variant='body3'>{helperText}</Typography>
      {type === 'password' ? (
        <div className='relative w-full py-1'>
          <input
            className={clsx('form-input block w-full rounded-md', [
              errors[name] && 'border-red-600',
            ])}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            {...register(name)}
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
            {showPassword ? (
              <AiOutlineEyeInvisible
                className='text-base'
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiOutlineEye
                className='text-base'
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
      ) : (
        <div className='relative w-full py-1'>
          <input
            className={clsx('form-input block w-full rounded-md', [
              errors[name] && 'border-red-600',
            ])}
            type={type}
            placeholder={placeholder}
            {...register(name)}
          />
          {errors[name] && (
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <HiExclamationCircle className='text-base text-error-600' />
            </div>
          )}
        </div>
      )}

      {errors[name] && (
        <Typography variant='label2' className=' text-error-600'>
          {errors[name]?.message as string}
        </Typography>
      )}
    </div>
  );
};

export const SelectInput = ({ data }: { data: string[] }) => {
  const [selectedData, setSelectedData] = useState(data[0]);
  return (
    <Listbox value={selectedData} onChange={setSelectedData}>
      <div className='relative mt-1'>
        <Listbox.Button className='relative w-full cursor-default rounded-lg bg-teal-50 py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
          <span className='block truncate'>{selectedData}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <BsChevronExpand className='text-base ' aria-hidden='true' />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-teal-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {data.map((item, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2.5 pl-10 pr-4 ${
                    active ? 'bg-secondary-800' : 'text-gray-900'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                        <BsCheck2 className='text-base' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
