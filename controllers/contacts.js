const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const contacts = await mongodb
      .getDatabase()
      .collection('contacts')
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Unable to retrieve contacts.'
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: 'Invalid contact ID.'
      });
    }

    const contact = await mongodb
      .getDatabase()
      .collection('contacts')
      .findOne({ _id: new ObjectId(contactId) });

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found.'
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Unable to retrieve contact.'
    });
  }
};

module.exports = {
  getAll,
  getSingle
};