const express = require('express');
const cors = require('cors');
require('dotenv').config();

const database = require('./data/database');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/contacts', require('./routes/contacts'));

database
  .initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to MongoDB:');
    console.error(error);
    process.exit(1);
  });