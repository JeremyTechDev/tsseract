import { useState } from 'react';

type RequestType = 'POST' | 'GET' | 'DELETE' | 'PUT';
type ReturnItem = [{}, (body?: {}) => Promise<void>];

const useFetch = (url: string, method: RequestType = 'GET'): ReturnItem => {
  const [data, setData] = useState({});

  const handleFetch = async (body: {} = {}) => {
    try {
      const { data } = await fetch(`http://localhost:8080${url}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(body),
      }).then((res) => res.json());

      setData(data);
    } catch (error) {
      setData({ error: true, message: error.message });
    }
  };

  return [data, handleFetch];
};

export default useFetch;
