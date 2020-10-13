import { useState } from 'react';

type RequestType = 'POST' | 'GET' | 'DELETE' | 'PUT';
type ReturnItem = {
  data: object;
  handleFetch: (
    body?: {},
    headers?: {},
  ) => Promise<{ response: Response; data: any } | undefined>;
};

const useFetch = (url: string, method: RequestType = 'GET'): ReturnItem => {
  const [data, setData] = useState({});

  const handleFetch = async (body = {}, headers = {}) => {
    try {
      const response = await fetch(`http://localhost:8080${url}`, {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      setData({ response, data });
      return { response, data };
    } catch (error) {
      setData({ error: true, message: error.message });
    }
  };

  return { data, handleFetch };
};

export default useFetch;
