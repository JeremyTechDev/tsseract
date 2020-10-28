import { iBackgroundImageData } from '../types';

const getRandomImg = async (): Promise<iBackgroundImageData> => {
  const target = `https://api.unsplash.com/photos/random/?orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  try {
    const data = await fetch(target).then((res) => res.json());
    const {
      alt_description,
      color,
      urls: { raw, regular },
      user: {
        name,
        links: { html },
      },
    } = data;

    return {
      color,
      description: alt_description,
      img: regular,
      link: html,
      name,
      raw,
    };
  } catch (error) {
    return { img: 'https://source.unsplash.com/random/1600x800' };
  }
};

export default getRandomImg;
