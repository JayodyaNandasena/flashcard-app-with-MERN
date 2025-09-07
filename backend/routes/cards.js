const express = require('express');
const { getAll, getByCategory, getById, createCard, deleteCard, updateCard } = require('../services/cardsService');
const { asyncHandler } = require('../middleware/asyncHandler');
const { validateCreateCard, validateCardIdParam, validateCategoryIdParam, validateUpdateCard } = require('../middleware/validator');

const router = express.Router();

// Create a new card
router.post(
  '/',
  validateCreateCard,
  asyncHandler(async (req, res) => {
    const cards = await createCard(req.body);
    res.json(cards);
  })
)

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
  validateCategoryIdParam,
  asyncHandler(async (req, res) => {
    const cards = await getByCategory(req.params.categoryId);
    res.json(cards);
  })
);

// Get single card by ID
router.get(
  '/:id',
  validateCardIdParam,
  asyncHandler(async (req, res) => {
    const card = await getById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  })
);

// Update a card by ID
router.put(
  '/:id',
  validateCardIdParam,
  validateUpdateCard,
  asyncHandler(async (req, res) => {
    const updatedCard = await updateCard(req.params.id, req.body);
    if (!updatedCard) {
      return res.status(404).json({ success: false, message: 'Card not found' });
    }
    res.json({ success: true, updatedCard });
  })
)

// Delete a card by ID
router.delete(
  '/:id',
  validateCardIdParam,
  asyncHandler(async (req, res) => {
    const deletedCard = await deleteCard(req.params.id);
    if (!deletedCard) {
      return res.status(404).json({ success: false, message: 'Card not found' });
    }
    res.json({ success: true, deletedCard });
  })
);

module.exports = router;