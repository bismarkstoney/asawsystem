const express = require('express');
const dbConnection = require('./config/db');
const app = express();

dbConnection();

app.use(express.json({ extended: false }));
//define Routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/contacts', require('./routes/contacts'));
app.use('/api/v1/auth', require('./routes/auth'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
