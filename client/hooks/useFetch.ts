import { useState } from 'react';

type RequestType = 'POST' | 'GET' | 'DELETE' | 'PUT';
type ReturnItem = [{}, (body?: {}) => Promise<void>];

const useFetch = (url: string, method: RequestType = 'GET'): ReturnItem => {
  const [data, setData] = useState({});

  const handleFetch = async (body: {} = {}) => {
    try {
      const { data } = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      }).then((res) => res.json());

      setData(data);
    } catch (error) {
      setData({ error: true, message: error.message });
    }
  };

  return [data, handleFetch];
};

export default useFetch;
