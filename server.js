const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./data/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

const connectDb = require('./data/database');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'temporary-development-secret',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Contacts, Companies, Projects, and Departments API using Mongoose');
});

app.use('/auth', require('./routes/auth'));
app.use('/contacts', require('./routes/contacts'));
app.use('/companies', require('./routes/companies'));
app.use('/projects', require('./routes/projects'));
app.use('/departments', require('./routes/departments'));

const startServer = async () => {
  await connectDb();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

if (require.main === module) {
  startServer();
}

module.exports = app;
