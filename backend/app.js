const express = require('express');

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./logger').getLogger('api:app');
const routes = require('./routes');
const responseMiddleware = require('./middlewares/response');
const cors = require('cors');

const app = express();
app.logger = logger;

app.use(responseMiddleware());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routes.init(app);

module.exports = app;
