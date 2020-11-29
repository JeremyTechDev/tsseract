import next from 'next';
import dummy from 'mongoose-dummy';

import server from './server';
const { NODE_ENV } = process.env;

const dev = NODE_ENV !== 'production';

const app = next({ dev, dir: './dist/client' });
const appHandler = app.getRequestHandler();

import UserModel from './models/user';

const result = [];
for (let index = 0; index < 20; index++) {
  const x = dummy(UserModel, {
    ignore: ['followers', 'following'],
    returnDate: true,
  });
  result.push(x);
}

console.log(JSON.stringify(result));

app.prepare().then(() => server({ dev, appHandler }));
