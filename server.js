const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDb = require('./data/database');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Contacts API using Mongoose');
});

app.use('/contacts', require('./routes/contacts'));

const startServer = async () => {
  await connectDb();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();