import Head from 'next/head';

type HeadElementProps = {
  title: string;
  description?: string;
};

const HeadElement = ({ title, description }: HeadElementProps) => {
  return (
    <Head>
      <title>{title} - Informatics FRS Helper</title>
      {description ? <meta name='description' content={description} /> : null}
    </Head>
  );
};

export default HeadElement;
