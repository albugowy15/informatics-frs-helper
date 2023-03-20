import Typography from '@/components/Typography';

export default function TypographyPage() {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <Typography variant='h1'>Text Heading 1</Typography>
      <Typography variant='h2'>Text Heading 2</Typography>
      <Typography variant='h3'>Text Heading 3</Typography>
      <Typography variant='h4'>Text Heading 4</Typography>
      <Typography variant='h5'>Text Heading 5</Typography>
      <Typography variant='h6'>Text Heading 6</Typography>
      <Typography variant='body1'>Text Body 1</Typography>
      <Typography variant='body2'>Text Body 2</Typography>
      <Typography variant='body3'>Text Body 3</Typography>
      <Typography variant='label1'>Text Label 1</Typography>
      <Typography variant='label2'>Text Label 2</Typography>
      <Typography variant='label3'>Text Label 3</Typography>
    </div>
  );
}
