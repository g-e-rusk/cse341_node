const mongodb = require('../db/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db('project1').collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('contacts').find({ _id: userId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContact = async(req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db('project1').collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).send('Contact created successfully.');
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the contact.');
    }
};

const updateContact = async(req, res) => {
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db('project1').collection('contacts').replaceOne({ _id: userId }, contact);
    if (response.modifiedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the contact.');
    }
};

const deleteContact = async(req, res) => {
    try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project1').collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).end();
    } else {
        res.status(404).send('Contact not found.');
    }
 } catch (error) {
    res.status(500).json(error.message || 'Some error occured while deleting the contact.')
 }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };