const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

const connectDb = require('./data/database');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Contacts and Companies API using Mongoose');
});

app.use('/contacts', require('./routes/contacts'));
app.use('/companies', require('./routes/companies'));

const startServer = async () => {
  await connectDb();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();