const { myDatabase } = require('./datasource');
const { throwCustomError } = require('../utils/errorHandling');

const getAllReviews = async () => {
    try {
        const result = myDatabase.query(
            `
            SELECT
            
            `
        );
        return result;
    } catch (err) {
        throwCustomError('Database_Error', 500);
    }
};

const getEachPlatformReviews = async () => {
    try {
        const result = myDatabase.query(
            `
            SELECT
            
            `
        );
        return result;
    } catch (err) {
        throwCustomError('Database_Error', 500);
    }
};

module.exports = {
    getAllReviews,
    getEachPlatformReviews,
};
