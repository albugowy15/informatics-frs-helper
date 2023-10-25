import { cn } from '@/lib/utils';

export type TypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'label1';

type Heading = 'h1' | 'h2' | 'h3' | 'h4';

const variantsMapping: Record<TypographyVariants, Heading | 'p'> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body1: 'p',
  label1: 'p',
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
      className={cn(
        [
          variant === 'h1' &&
            'text-4xl font-extrabold tracking-tight lg:text-5xl',
          variant === 'h2' &&
            'text-3xl font-semibold tracking-tight first:mt-0',
          variant === 'h3' && 'text-2xl font-semibold tracking-tight',
          variant === 'h4' && 'text-xl font-semibold tracking-tight',
          variant === 'body1' && 'leading-7 [&:not(:first-child)]:mt-3',
          variant === 'label1' && 'text-sm font-medium leading-none',
        ],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;
