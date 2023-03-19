import clsx from 'clsx';

type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'label1'
  | 'label2'
  | 'label3';

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const variantsMapping: Record<TypographyVariants, Heading | 'p'> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  label1: 'p',
  label2: 'p',
  label3: 'p',
};

type TypographyProps<T extends React.ElementType> = {
  variant: TypographyVariants;
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

const Typography = <T extends React.ElementType>({
  variant,
  children,
  className,
  ...props
}: TypographyProps<T>) => {
  const Component = variantsMapping[variant];

  return (
    <Component
      className={clsx('text-black', [
        variant === 'h1' && 'text-4xl font-bold',
        variant === 'h2' && 'text-3xl font-bold',
        variant === 'h3' && 'text-2xl font-bold',
        variant === 'h4' && 'text-xl font-bold',
        variant === 'h5' && 'text-lg font-bold',
        variant === 'h6' && 'text-base font-bold',
        variant === 'body1' && 'text-base',
        variant === 'body2' && 'text-sm',
        variant === 'body3' && 'text-xs',
        variant === 'label1' && 'text-sm font-medium',
        variant === 'label2' && 'text-xm font-medium',
        variant === 'label3' && 'text-[11px] font-medium leading-4',
      ])}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
