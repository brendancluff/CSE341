const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

const database = require('./data/database');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Contacts API is running.');
});

app.use('/contacts', require('./routes/contacts'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

database
  .initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger documentation: http://localhost:${port}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to MongoDB:');
    console.error(error);
    process.exit(1);
  });