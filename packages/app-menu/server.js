const compression = require('compression');
const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const debug = require('debug');
const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    server.all('*', (req, res) => {
      debug.log(`[ ${res.statusCode} ]`, req.url);
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      debug.log('>', `Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    debug.log('[ error ]', err);
    process.exit(1);
  });
