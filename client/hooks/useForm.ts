import { useState } from 'react';

type ReturnItem = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

const useForm = <T>(initialValues: T): [T, ReturnItem] => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return [values, handleChange];
};

export default useForm;
