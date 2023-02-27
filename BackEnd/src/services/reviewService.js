const reviewDao = require('../models/reviewDao');

const getAllReviews = async () => {
    return await reviewDao.getAllReviews();
};

const getEachPlatformReviews = async () => {
    return await reviewDao.getEachPlatformReviews();
};

module.exports = {
    getAllReviews,
    getEachPlatformReviews,
};
