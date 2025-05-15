const express = require('express');
const router = express.Router();

const contactContoller = require('../controllers/contacts');

router.get('/', contactContoller.getAll);

router.get('/:id', contactContoller.getSingle);

router.post('/', contactContoller.createContact);

router.put('/:id', contactContoller.updateContact);

router.delete('/:id', contactContoller.deleteContact);

module.exports = router;