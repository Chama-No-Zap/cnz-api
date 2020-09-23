const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./src/utils/connection');

const app = express();

app.use(bodyParser.json());

app.use(connection);

app.listen(3000, () => console.log('listen to port 3000'));
