const mongoose = require('mongoose');

const Flashcard = require('../models/Flashcard');
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

// Create a new flashcard
const createCard = async (data) => {
  return await Flashcard.create({
    question: data.question,
    answer: data.answer,
    categoryId: new mongoose.Types.ObjectId(data.categoryId),
    userId: new mongoose.Types.ObjectId(data.userId)
  });
};

// Update a flashcard
const updateCard = async (id, data) => {
  return await Flashcard.findByIdAndUpdate(id, {
    question: data.question,
    answer: data.answer,
    categoryId: new mongoose.Types.ObjectId(data.categoryId)
  }, { new: true });
};

// Delete a flashcard
const deleteCard = async (id) => {
  return await Flashcard.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getByCategory,
  getById,
  createCard,
  updateCard,
  deleteCard
};
