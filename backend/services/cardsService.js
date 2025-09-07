const Flashcard = require('../models/Flashcard'); // Import the Flashcard model
require('../models/Category'); // register Category model
require('../models/User');     // register User model

// Get all flashcards
const getAll = async () => {
  return await Flashcard.find()
    .populate('categoryId');
};

// Get flashcards by category
const getByCategory = async (categoryId) => {
  return await Flashcard.find({ categoryId })
    .populate('categoryId');
};

// Get a flashcard by ID
const getById = async (id) => {
  return await Flashcard.findById(id)
    .populate('categoryId');
};

module.exports = {
  getAll,
  getByCategory,
  getById
};
