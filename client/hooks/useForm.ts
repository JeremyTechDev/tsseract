import { useState } from 'react';

type ReturnItem = (event: InputChangeEvent) => void;
import { InputChangeEvent } from '../types';

const useForm = <T>(initialValues: T): [T, ReturnItem] => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: InputChangeEvent) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return [values, handleChange];
};

export default useForm;
