import { FC } from 'react';

interface Props {
  card?: 'summary' | 'summary_large_image';
  creator?: string;
  description?: string;
  image?: string;
  title: string;
  path?: string;
}

const TwitterMeta: FC<Props> = ({
  card = 'summary',
  creator,
  description,
  image,
  title,
  path = '',
}) => {
  const defaultURL = process.env.PRODUCTION_URL;
  const defaultImage = `${defaultURL}/Square-${
    card === 'summary' ? 'bottom' : 'aside'
  }/logo_size.jpg`;

  return (
    <>
      <meta name="twitter:card" content={card} />
      <meta property="og:title" content={title} />
      {creator && <meta name="twitter:creator" content={`@${creator}`} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={defaultURL + path} />
      <meta property="og:image" content={image || defaultImage} />
    </>
  );
};

export default TwitterMeta;
