import { useState } from 'react';

import { imgExists } from '../helpers/imgExists';

type handleFN = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

const useImg = <T, U>(
  initialImgs: T,
  initialImgsFound: U,
): { imgs: T; handleImgChange: handleFN; imgsFound: U } => {
  const [imgs, setImgs] = useState(initialImgs);
  const [imgsFound, setImgsFound] = useState(initialImgsFound);

  const handleImgChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value: url } = event.target;

    setImgs((prev) => ({ ...prev, [name]: url }));
    setImgsFound((prev) => ({ ...prev, [name]: imgExists(url) }));
  };

  return { imgs, handleImgChange, imgsFound };
};

export default useImg;
