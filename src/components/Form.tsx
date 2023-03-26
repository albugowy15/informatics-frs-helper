import { Listbox, Switch, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import {
  ControllerRenderProps,
  FieldError,
  useFormContext,
} from 'react-hook-form';
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
    <div className='flex w-full flex-col'>
      <Typography variant='label1'>{label}</Typography>
      <Typography variant='body3'>{helperText}</Typography>
      {type === 'password' ? (
        <div className='relative w-full pt-1'>
          <input
            className={clsx('form-input block w-full rounded-md', [
              errors[name] ? 'border-red-600' : 'border-neutral-600',
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
        <div className='relative w-full pt-1'>
          <input
            className={clsx('form-input block w-full rounded-md', [
              errors[name] ? 'border-red-600' : 'border-neutral-600',
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
        <Typography variant='label2' className='mt-1 text-error-600'>
          {errors[name]?.message as string}
        </Typography>
      )}
    </div>
  );
};

type SelectInputProps = {
  label: string;
  placeholder: string;
  data?: string[] | number[];
  helperText?: string;
  error?: FieldError;
  disabled?: boolean;
} & Partial<ControllerRenderProps>;

export const SelectInput = ({
  name,
  onChange,
  value,
  label,
  data,
  helperText,
  error,
  disabled = false,
  placeholder,
}: SelectInputProps) => {
  return (
    <div className='w-full'>
      <Typography variant='label1'>{label}</Typography>
      <Typography variant='body3'>{helperText}</Typography>
      <Listbox
        disabled={disabled}
        value={value}
        onChange={onChange}
        name={name}
      >
        <div className='relative mt-1'>
          <Listbox.Button
            className={clsx(
              'relative w-full cursor-default rounded-lg border border-neutral-600 py-2.5 pl-3 pr-10 text-left text-sm md:text-base',
              [disabled && 'bg-neutral-800 text-neutral-400']
            )}
          >
            <span className='block truncate'>
              {value ? value : placeholder}
            </span>
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
            <Listbox.Options className='absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:text-base'>
              {data ? (
                <>
                  {data.map((item, idx) => (
                    <Listbox.Option
                      key={idx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2.5 pl-10 pr-4 ${
                          active ? 'bg-primary-800' : 'text-gray-900'
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
                              <BsCheck2
                                className='text-base'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </>
              ) : (
                <Listbox.Option
                  disabled
                  value=''
                  className='relative cursor-default select-none py-2.5 pl-10 pr-4 text-neutral-500'
                >
                  <span>--Tidak ada opsi--</span>
                </Listbox.Option>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error && (
        <Typography variant='label2' className='pt-1 text-error-600'>
          {error.message}
        </Typography>
      )}
    </div>
  );
};

type SwitchInputProps = {
  label: string;
} & ControllerRenderProps;
export const SwitchInput = ({ value, onChange, label }: SwitchInputProps) => {
  return (
    <div className='flex items-center gap-2'>
      <Typography variant='label1'>{label}</Typography>
      <Switch
        checked={value}
        onChange={onChange}
        className={`${value ? 'bg-primary-500' : 'bg-neutral-700'}
          relative inline-flex h-[16px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className='sr-only'>Use setting</span>
        <span
          aria-hidden='true'
          className={`${value ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};
