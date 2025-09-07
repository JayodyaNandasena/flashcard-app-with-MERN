const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
