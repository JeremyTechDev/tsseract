const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const useValidation = <T>(values: T) => {
  const data = Object.entries(values);

  const validate = () => {
    const errors: any = {};

    data.forEach(([key, value]) => {
      switch (key) {
        case 'name':
          if (value.trim() === '' || !value)
            return (errors[key] = 'This field is required');
          if (value.length <= 0)
            return (errors[key] = 'Name must must have at least 1 characters');
          if (value.length > 95) return (errors[key] = 'Name is too long');
          break;

        case 'email':
          if (value.trim() === '' || !value)
            return (errors[key] = 'This field is required');
          if (!emailRegex.test(value)) return (errors.email = 'Invalid email');
          break;

        case 'password':
          if (value.trim() === '' || !value)
            return (errors[key] = 'This field is required');
          if (value.length < 8)
            return (errors[key] = 'Password must have at least 8 characters');
          if (value.length > 25)
            return (errors[key] = 'Password must have less than 25 characters');
          break;

        case 'rPassword':
          if (value.trim() === '' || !value)
            return (errors[key] = 'This field is required');

          // @ts-ignore
          if (value !== values.password)
            return (errors[key] = 'Passwords must match');
          break;
      }
    });

    return errors;
  };
  return { validate };
};

export default useValidation;
