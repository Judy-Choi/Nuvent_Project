const reviewService = require('../services/reviewService');
const { asyncErrorHandler } = require('../utils/errorHandling');
const { throwCustomError } = require('../utils/errorHandling');

const getAllReviews = asyncErrorHandler(async (req, res) => {
    const query = req.query;
    const result = await reviewService.getAllReviews(query);

    return res.status(200).json(result);
});

const getEachPlatformReviews = asyncErrorHandler(async (req, res) => {
    const { platformId } = req.params;

    if (!platformId) {
        throwCustomError('KEY_ERROR', 400);
    }

    const reviews = await reviewService.getEachPlatformReviews(req.userId, platformId);
    return res.status(200).json(reviews);
});

module.exports = {
    getAllReviews,
    getEachPlatformReviews,
};
