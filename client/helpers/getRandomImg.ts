interface Data {
  color?: string;
  description?: string;
  full: string;
  link?: string;
  name?: string;
  raw?: string;
}

const getRandomImg = async (): Promise<Data> => {
  const target = `https://api.unsplash.com/photos/random/?orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  try {
    const data = await fetch(target).then((res) => res.json());
    const {
      alt_description,
      color,
      urls: { full, raw },
      user: {
        name,
        links: { html },
      },
    } = data;

    return { description: alt_description, color, full, raw, name, link: html };
  } catch (error) {
    return { full: 'https://source.unsplash.com/random/1600x800' };
  }
};

export default getRandomImg;
