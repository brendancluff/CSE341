const dns = require('dns');
const { MongoClient } = require('mongodb');
require('dotenv').config();

dns.setServers(['8.8.8.8', '1.1.1.1']);

let database;

const initDb = async () => {
  if (database) {
    console.log('Database is already initialized.');
    return database;
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();

  database = client.db('cse341');

  console.log('Connected to MongoDB');

  return database;
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database has not been initialized.');
  }

  return database;
};

module.exports = {
  initDb,
  getDatabase
};