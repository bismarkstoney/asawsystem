const express = require('express');
const router = express.Router();

//@router POST api/v1/users
//@desc   Register a user
//@access Public
router.post('/', (req, res) => {
	res.send('Risgert');
});

module.exports = router;
