const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/github', require('./controllers/github'));
app.use('/api/v1/posts', require('./controllers/posts'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
