const express = require('express');
const connectToMongo = require('./db');
var cors = require('cors')
connectToMongo();
const app = express();
const port = 8000;

app.use(express.json())
app.use(cors())

// Available Routes
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

