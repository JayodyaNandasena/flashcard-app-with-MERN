const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
const cardsRouter = require('./routes/cards');
const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

// handle cards routes
app.use('/cards', cardsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
