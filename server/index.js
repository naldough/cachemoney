/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const itemRouter = require('./routes/item-router');

const app = express();
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    hostname: process.env.REEACT_APP_API_HOST || 'http://localhost:3000/',
    httpsAgent: https.Agent({
      rejectUnauthorized: false,
    }),
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.use('/api', itemRouter);
app.use('/api', itemRouter);

app.listen(apiPort, () => {
    console.log(`Server running on port ${apiPort}`);
  
// The order of routes are important
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(api, () => {
    console.log(`[Hack.Diversity React Template] - Server running on port ${apiPort}`);
});
