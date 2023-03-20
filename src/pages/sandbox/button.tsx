import { BsFacebook, BsPersonPlus } from 'react-icons/bs';

import { Button, IconButton, LinkButton } from '@/components/Button';
import Typography from '@/components/Typography';
export default function ButtonPage() {
  return (
    <div className='flex flex-wrap gap-10 py-10 px-10'>
      <div>
        <Typography variant='h3'>Button</Typography>
        <Typography variant='body1'>Filled Buttons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <Button variant='filled'>Filled Button</Button>
          <Button variant='filled' disabled>
            Filled Button
          </Button>
          <Button variant='filled' icon={BsPersonPlus}>
            Filled Button
          </Button>
        </div>
        <Typography variant='body1'>Outlined Buttons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <Button variant='outlined'>Outlined Button</Button>
          <Button variant='outlined' disabled>
            Outlined Button
          </Button>
          <Button variant='outlined' icon={BsPersonPlus}>
            Outlined Button
          </Button>
        </div>
        <Typography variant='body1'>Text Buttons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <Button variant='text'>Text Button</Button>
          <Button variant='text' disabled>
            Text Button
          </Button>
          <Button variant='text' icon={BsPersonPlus}>
            Text Button
          </Button>
        </div>
        <Typography variant='body1'>Elevated Buttons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <Button variant='elevated'>Eilled Button</Button>
          <Button variant='elevated' disabled>
            Elevated Button
          </Button>
          <Button variant='elevated' icon={BsPersonPlus}>
            Elevated Button
          </Button>
        </div>
        <Typography variant='body1'>Tonal Buttons</Typography>
        <div className='mt-2 flex gap-2'>
          <Button variant='tonal'>Eilled Button</Button>
          <Button variant='tonal' disabled>
            Tonal Button
          </Button>
          <Button variant='tonal' icon={BsPersonPlus}>
            Tonal Button
          </Button>
        </div>
      </div>
      <div>
        <Typography variant='h3'>Link Button</Typography>
        <Typography variant='body1'>Filled Buttons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <LinkButton href='/' variant='filled'>
            Filled LinkButton
          </LinkButton>
          <LinkButton href='/' variant='filled' icon={BsPersonPlus}>
            Filled LinkButton
          </LinkButton>
        </div>
        <Typography variant='body1'>Outlined LinkButtons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <LinkButton href='/' variant='outlined'>
            Outlined LinkButton
          </LinkButton>
          <LinkButton href='/' variant='outlined' icon={BsPersonPlus}>
            Outlined LinkButton
          </LinkButton>
        </div>
        <Typography variant='body1'>Text LinkButtons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <LinkButton href='/' variant='text'>
            Text LinkButton
          </LinkButton>
          <LinkButton href='/' variant='text' icon={BsPersonPlus}>
            Text LinkButton
          </LinkButton>
        </div>
        <Typography variant='body1'>Elevated LinkButtons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <LinkButton href='/' variant='elevated'>
            Eilled LinkButton
          </LinkButton>
          <LinkButton href='/' variant='elevated' icon={BsPersonPlus}>
            Elevated LinkButton
          </LinkButton>
        </div>
        <Typography variant='body1'>Tonal LinkButtons</Typography>
        <div className='mt-2 flex gap-2'>
          <LinkButton href='/' variant='tonal'>
            Eilled LinkButton
          </LinkButton>
          <LinkButton href='/' variant='tonal' icon={BsPersonPlus}>
            Tonal LinkButton
          </LinkButton>
        </div>
      </div>
      <div>
        <Typography variant='body1'>Filled Icon Buttons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <IconButton variant='filled' icon={BsFacebook} />
          <IconButton variant='filled' disabled icon={BsFacebook} />
        </div>
        <Typography variant='body1'>Outlined IconButtons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <IconButton variant='filled' icon={BsFacebook} />
          <IconButton variant='filled' disabled icon={BsFacebook} />
        </div>
        <Typography variant='body1'>Text IconButtons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <IconButton variant='filled' icon={BsFacebook} />
          <IconButton variant='filled' disabled icon={BsFacebook} />
        </div>
        <Typography variant='body1'>Elevated IconButtons</Typography>
        <div className='mt-2 mb-5 flex gap-2'>
          <IconButton variant='filled' icon={BsFacebook} />
          <IconButton variant='filled' disabled icon={BsFacebook} />
        </div>
        <Typography variant='body1'>Tonal IconButtons</Typography>
        <div className='mt-2 flex gap-2'>
          <IconButton variant='filled' icon={BsFacebook} />
          <IconButton variant='filled' disabled icon={BsFacebook} />
        </div>
      </div>
    </div>
  );
}
