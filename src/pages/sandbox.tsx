import { LinkButton } from '@/components/Button';
import Typography from '@/components/Typography';

export default function SandboxPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <Typography variant='h2'>Reusable Component</Typography>
      <div className='flex justify-center gap-2 py-3'>
        <LinkButton href='/sandbox/typography' variant='outlined'>
          Typography
        </LinkButton>
        <LinkButton href='/sandbox/button' variant='outlined'>
          Button
        </LinkButton>
        <LinkButton href='/sandbox/form' variant='outlined'>
          Forms
        </LinkButton>
        <LinkButton href='/sandbox/modal' variant='outlined'>
          Modal
        </LinkButton>
        <LinkButton href='/sandbox/loading' variant='outlined'>
          Loading Indicator
        </LinkButton>
        <LinkButton href='/sandbox/radio' variant='outlined'>
          Radio Button
        </LinkButton>
        <LinkButton href='/sandbox/select' variant='outlined'>
          Select
        </LinkButton>
      </div>
      <div className='py-3' />
      <Typography variant='h2'>Pages</Typography>
    </div>
  );
}
