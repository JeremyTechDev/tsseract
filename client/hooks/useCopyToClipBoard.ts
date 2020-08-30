import { useEffect, useState, useCallback } from 'react';
import copy from 'copy-to-clipboard';

const useCopyToClipboard = (
  resetInterval: number,
): [boolean, (text: string | number) => void] => {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = useCallback((text: string | number) => {
    copy(text.toString());
    setCopied(true);
  }, []);

  useEffect(() => {
    let timeout: any;
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied, resetInterval]);

  return [isCopied, handleCopy];
};

export default useCopyToClipboard;
