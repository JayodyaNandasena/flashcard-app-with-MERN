const express = require('express');
const { getAll, getByCategory, getById } = require('../services/cardsService');
const { asyncHandler } = require('../middleware/asyncHandler');

const router = express.Router();

// Get all cards
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const cards = await getAll();
    res.json(cards);
  })
);

// Get cards by category
router.get(
  '/category/:categoryId',
  asyncHandler(async (req, res) => {
    const cards = await getByCategory(req.params.categoryId);
    res.json(cards);
  })
);

// Get single card by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const card = await getById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  })
);

module.exports = router;