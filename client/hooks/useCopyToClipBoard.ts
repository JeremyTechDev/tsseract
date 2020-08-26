import { useEffect, useState, useCallback } from 'react';
import copy from 'copy-to-clipboard';

const useCopyToClipboard = (resetInterval: number) => {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = useCallback((text: string | number) => {
    copy(text.toString());
    setCopied(true);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(setTimeout(() => setCopied(false), resetInterval));
    };
  }, [isCopied, resetInterval]);

  return [isCopied, handleCopy];
};

export default useCopyToClipboard;
