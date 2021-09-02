const express = require('express');
const app = express();

//define Routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/contacts', require('./routes/contacts'));
app.use('/api/v1/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
