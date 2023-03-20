import Link, { LinkProps } from 'next/link';
import React from 'react';

export type BasicLinkProps = {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & React.ComponentPropsWithRef<'a'>;

const BasicLink = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
  ({ children, href, newTab, className, nextLinkProps, ...rest }, ref) => {
    const isNewTab =
      newTab !== undefined
        ? newTab
        : href && !href.startsWith('/') && href.startsWith('#');

    if (!isNewTab) {
      return (
        <Link
          href={href}
          ref={ref}
          className={className}
          {...rest}
          {...nextLinkProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target='_blank'
        rel='noreferrer noopener'
        ref={ref}
        {...rest}
        className={className}
      >
        {children}
      </a>
    );
  }
);

export default BasicLink;
