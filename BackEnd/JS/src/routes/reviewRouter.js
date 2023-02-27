const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.get('/', reviewController.getAllReviews);
router.get('/:userId', reviewController.getEachPlatformReviews);

module.exports = {
    router,
};
