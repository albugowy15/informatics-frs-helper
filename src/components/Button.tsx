import clsx from 'clsx';
import React from 'react';
import { IconType } from 'react-icons';

import BasicLink, { BasicLinkProps } from './BasicLink';

type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  iconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      variant = 'filled',
      size = 'md',
      icon: Icon,
      iconClassName,
      ...rest
    },
    ref
  ) => {
    const disabled = buttonDisabled || false;
    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsx(
          'inline-flex items-center rounded-3xl font-medium hover:shadow-md disabled:cursor-not-allowed disabled:text-neutral-500 disabled:shadow-none',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'transition-colors duration-75',
          [
            size === 'sm' && 'px-4 py-2 text-xs',
            size === 'md' && 'px-5 py-2.5 text-sm',
            size === 'lg' && 'px-6 py-3 text-base',
          ],
          [
            variant === 'filled' &&
              'bg-primary-500 text-white hover:bg-primary-400 disabled:bg-neutral-900 ',
            variant === 'outlined' &&
              'border border-neutral-600 bg-transparent text-primary-400 hover:border-primary-500 hover:bg-neutral-900 disabled:border-neutral-600 disabled:bg-transparent',
            variant === 'text' &&
              'text-primary-400 hover:bg-neutral-900 disabled:bg-transparent',
            variant === 'elevated' &&
              'bg-slate-100 text-primary-400 shadow-md shadow-slate-400 hover:bg-slate-200 disabled:bg-neutral-900 disabled:shadow-none',
            variant === 'tonal' &&
              'bg-secondary-900 hover:bg-secondary-800 disabled:bg-neutral-900',
          ],
          className
        )}
        {...rest}
      >
        {Icon && (
          <span className='mr-2'>
            <Icon
              className={clsx(
                [
                  size === 'sm' && 'text-xs',
                  size === 'md' && 'text-sm',
                  size === 'lg' && 'text-base',
                ],
                iconClassName
              )}
            />
          </span>
        )}
        {children}
      </button>
    );
  }
);

type LinkButtonProps = {
  variant: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  iconClassName?: string;
} & BasicLinkProps;

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      children,
      className,
      variant = 'filled',
      size = 'md',
      icon: Icon,
      iconClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <BasicLink
        ref={ref}
        {...rest}
        className={clsx(
          'inline-flex items-center rounded-3xl font-medium hover:shadow-md disabled:cursor-not-allowed disabled:text-neutral-500 disabled:shadow-none',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'transition-colors duration-75',
          [
            size === 'sm' && 'px-4 py-2 text-xs',
            size === 'md' && 'px-5 py-2.5 text-sm',
            size === 'lg' && 'px-6 py-3 text-base',
          ],
          [
            variant === 'filled' &&
              'bg-primary-500 text-white hover:bg-primary-400 disabled:bg-neutral-900 ',
            variant === 'outlined' &&
              'border border-neutral-600 bg-transparent text-primary-400 hover:border-primary-500 hover:bg-neutral-900 disabled:border-neutral-600 disabled:bg-transparent',
            variant === 'text' &&
              'text-primary-400 hover:bg-neutral-900 disabled:bg-transparent',
            variant === 'elevated' &&
              'bg-slate-100 text-primary-400 shadow-md shadow-slate-400 hover:bg-slate-200 disabled:bg-neutral-900 disabled:shadow-none',
            variant === 'tonal' &&
              'bg-secondary-900 hover:bg-secondary-800 disabled:bg-neutral-900',
          ],
          className
        )}
      >
        {Icon && (
          <span className='mr-2'>
            <Icon
              className={clsx(
                [
                  size === 'sm' && 'text-xs',
                  size === 'md' && 'text-sm',
                  size === 'lg' && 'text-base',
                ],
                iconClassName
              )}
            />
          </span>
        )}
        {children}
      </BasicLink>
    );
  }
);

type IconButtonProps = {
  variant: ButtonVariant;
  size?: ButtonSize;
  icon: IconType;
} & React.ComponentPropsWithRef<'button'>;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      disabled: buttonDisabled,
      variant = 'filled',
      size = 'md',
      icon: Icon,
      ...rest
    },
    ref
  ) => {
    const disabled = buttonDisabled || false;
    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsx(
          'inline-flex items-center rounded-3xl font-medium hover:shadow-md disabled:cursor-not-allowed disabled:text-neutral-500 disabled:shadow-none',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'transition-colors duration-75',
          [
            size === 'sm' && 'p-2 text-xs',
            size === 'md' && 'p-3 text-sm',
            size === 'lg' && 'p-4 text-base',
          ],
          [
            variant === 'filled' &&
              'bg-primary-500 text-white hover:bg-primary-400 disabled:bg-neutral-900 ',
            variant === 'outlined' &&
              'border border-neutral-600 bg-transparent text-primary-400 hover:border-primary-500 hover:bg-neutral-900 disabled:border-neutral-600 disabled:bg-transparent',
            variant === 'text' &&
              'text-primary-400 hover:bg-neutral-900 disabled:bg-transparent',
            variant === 'elevated' &&
              'bg-slate-100 text-primary-400 shadow-md shadow-slate-400 hover:bg-slate-200 disabled:bg-neutral-900 disabled:shadow-none',
            variant === 'tonal' &&
              'bg-secondary-900 hover:bg-secondary-800 disabled:bg-neutral-900',
          ],
          className
        )}
        {...rest}
      >
        {Icon && <Icon className={className} />}
      </button>
    );
  }
);
