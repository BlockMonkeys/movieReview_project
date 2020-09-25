const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db.js');
const page = require('./template.js');
const rootRouter = require('./routes/root');
const boardRouter = require('./routes/board');
const authRouter = require('./auth/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


app.use('/', rootRouter);
app.use('/board', boardRouter);
app.use('/auth', authRouter);

app.listen(3000);