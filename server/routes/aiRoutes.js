const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { generateRecipe, findSubstitute } = require('../controllers/aiController');

// Rate limiter for AI routes to prevent excessive requests
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 AI requests per window
  message: {
    success: false,
    message: 'Too many AI requests from this IP, please try again after 15 minutes.'
  }
});

router.post('/generate-recipe', aiLimiter, generateRecipe);
router.post('/substitute', aiLimiter, findSubstitute);

module.exports = router;
