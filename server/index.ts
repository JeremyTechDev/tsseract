import next from 'next';

import server from './server';
const { NODE_ENV } = process.env;

const dev = NODE_ENV !== 'production';

const app = next({ dev, dir: './dist/client' });
const appHandler = app.getRequestHandler();

app.prepare().then(() => server({ dev, appHandler }));
