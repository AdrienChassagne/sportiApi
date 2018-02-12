import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';

import favRoutes from './routes/fav.server.routes';

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
  next();
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://rerenis:cococo123@ds113136.mlab.com:13136/favdb');

SourceMapSupport.install();

app.use('/api', favRoutes);

app.get('/', (req, res) => {
  return res.end('Api ok');
})

app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>not found</h2>');
});

app.listen(port, () => {
  console.log('app server listening');
});