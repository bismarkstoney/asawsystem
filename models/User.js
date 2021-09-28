const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter a name'],
	},

	email: {
		type: String,
		required: [true, 'Please enter a email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('user', UserSchema);
