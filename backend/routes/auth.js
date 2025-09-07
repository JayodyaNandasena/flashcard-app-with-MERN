const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const { validateLogin } = require('../middleware/validator');
const { authenticateUser } = require('../services/authService');

const router = express.Router();

router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res) => {
        const user = await authenticateUser(req.body);
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }
        res.json({ success: true, message: 'Login successful' });
    })
)

module.exports = router;