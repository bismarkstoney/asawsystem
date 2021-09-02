const express = require('express');
const router = express.Router();

//@router POST api/v1/auth
//@desc   Auther user and get token
//@access Public
router.post('/', (req, res) => {
	res.send('Login');
});

//@router GET api/v1/auth
//@desc   Register a user
//@access Private
router.get('/', (req, res) => {
	res.send('get logged in user');
});

module.exports = router;
