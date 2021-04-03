import next from 'next';

import server from './server';

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, dir: './dist/client' });
const appHandler = app.getRequestHandler();

app.prepare().then(() => server({ dev, appHandler }));
