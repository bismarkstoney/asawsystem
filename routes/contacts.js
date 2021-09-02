const express = require('express');
const router = express.Router();

//@router GET api/v1/contacts
//@desc   GET all users contacts
//@access Private
router.get('/', (req, res) => {
	res.send('get all contacts');
});

//@router POST api/v1/contacts
//@desc   Add new contact
//@access Private
router.get('/', (req, res) => {
	res.send('add contact');
});

//@router PUT api/v1/contacts/:id
//@desc   Update contact
//@access Private
router.put('/:id', (req, res) => {
	res.send('update contact');
});

//@router DELEETE api/v1/contacts/:id
//@desc   Delete contact
//@access Private
router.delete('/:id', (req, res) => {
	res.send('Delate contact');
});

module.exports = router;
