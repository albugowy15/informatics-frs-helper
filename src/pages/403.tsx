export default function Custom403() {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <h1 className='text-4xl font-bold text-neutral-100'>403 | Forbidden</h1>
      <p className='text-lg text-neutral-300'>
        You don't have permission to access this page.
      </p>
    </div>
  );
}
