import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import proxy from 'http-proxy-middleware';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

const proxyTo = 'http://localhost:8000';
// const proxyTo = 'http://192.168.13.33:8000';
// const proxyTo = 'http://10.100.2.5:8000';

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use("/api", proxy({
    target: proxyTo,
    pathRewrite: {
      '^/api' : ''
    },
    logLevel: 'debug'
}));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  }
});
