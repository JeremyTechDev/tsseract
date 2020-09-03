const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/im;

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

        case 'username':
          if (value.trim() === '' || !value)
            return (errors[key] = 'This field is required');
          if (value.length <= 2)
            return (errors[key] = 'Username must have at least 3 characters');
          if (value.length > 50)
            return (errors[key] = 'Username must have less than 50 characters');
          if (!usernameRegex.test(value))
            return (errors[key] = 'Invalid username');
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

        case 'birthDate':
          if (value.trim() === '' || !value)
            return (errors[key] = 'This field is required');

          const date = new Date(value);
          const isOver18 =
            new Date(
              date.getFullYear() + 18,
              date.getMonth() - 1,
              date.getDate(),
            ) <= new Date();

          if (!isOver18)
            return (errors[key] =
              'You must be over 18 years old to create a Tsseract account');
          break;
      }
    });

    return errors;
  };
  return { validate };
};

export default useValidation;
