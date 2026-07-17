const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const requiredFields = [
  'firstName',
  'lastName',
  'email',
  'favoriteColor',
  'birthday'
];

const validateContact = (body) => {
  return requiredFields.every(
    (field) =>
      body[field] !== undefined &&
      body[field] !== null &&
      String(body[field]).trim() !== ''
  );
};

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

const createContact = async (req, res) => {
  try {
    if (!validateContact(req.body)) {
      return res.status(400).json({
        message:
          'firstName, lastName, email, favoriteColor, and birthday are required.'
      });
    }

    const contact = {
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      favoriteColor: req.body.favoriteColor.trim(),
      birthday: req.body.birthday.trim()
    };

    const response = await mongodb
      .getDatabase()
      .collection('contacts')
      .insertOne(contact);

    if (!response.acknowledged) {
      return res.status(500).json({
        message: 'Contact could not be created.'
      });
    }

    res.status(201).json({
      id: response.insertedId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Unable to create contact.'
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: 'Invalid contact ID.'
      });
    }

    if (!validateContact(req.body)) {
      return res.status(400).json({
        message:
          'firstName, lastName, email, favoriteColor, and birthday are required.'
      });
    }

    const contact = {
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      favoriteColor: req.body.favoriteColor.trim(),
      birthday: req.body.birthday.trim()
    };

    const response = await mongodb
      .getDatabase()
      .collection('contacts')
      .updateOne(
        { _id: new ObjectId(contactId) },
        { $set: contact }
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: 'Contact not found.'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Unable to update contact.'
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: 'Invalid contact ID.'
      });
    }

    const response = await mongodb
      .getDatabase()
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(contactId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: 'Contact not found.'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Unable to delete contact.'
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};