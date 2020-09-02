const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/im;

const validate = <T>(values: T) => {
  const data = Object.entries(values);
  const errors: any = {};

  data.forEach(([key, value]) => {
    switch (key) {
      case 'name':
        if (value.trim() === '')
          return (errors.name = 'This field is required');
        if (value.length <= 0 || value.length > 255)
          return (errors.name = 'Name must be between 1 and 255 characters');

      case 'username':
        if (value.trim() === '')
          return (errors.username = 'This field is required');
        if (value.length <= 2 || value.length > 20)
          return (errors.username =
            'Username must be between 3 and 20 characters');
        if (!usernameRegex.test(value))
          return (errors.username = 'Invalid username');

      case 'email':
        if (!emailRegex.test(value)) return (errors.email = 'Invalid email');
      default:
        console.log('nada');
    }
  });

  console.log(errors);
};

export default validate;
