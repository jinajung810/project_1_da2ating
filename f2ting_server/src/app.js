const express = require('express');
const cors = require('cors');
const logger = require('morgan');

require('dotenv').config();

const connectDatabase = require('./db');
connectDatabase();

const app = express();

app.use(logger('dev'));
app.use(cors({ credentials: true }));
app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: true, limit: '12mb' }));

const initApi = require('./api');
initApi(app);

app.listen(process.env.PORT_NUM, () => {
  console.log(`Server start from ${process.env.PORT_NUM} port`);
});