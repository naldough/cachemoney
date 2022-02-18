/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const itemRouter = require('./routes/item-router');

const app = express();
const apiPort = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// const CONNECTION_URL="mongodb+srv://ohi:ohi2022@cluster0.m1nlq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// mongoose.connect(CONNECTION_URL)
//     .then(() => app.listen(apiPORT, () => console.log(`Server running on port: ${PORT}`)))
//     .catch((error) => console.log(error.message))

// mongoose.set('useFindAndModify', false);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', itemRouter);

app.listen(apiPort, () => {
    console.log(`[Hack.Diversity React Template] - Server running on port ${apiPort}`);
});
