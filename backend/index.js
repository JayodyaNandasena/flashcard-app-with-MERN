const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
const cardsRouter = require('./routes/cards');
const { errorHandler } = require('./middleware/errorHandler');
const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// handle cards routes
app.use('/cards', cardsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
