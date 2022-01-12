// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

// Based on lecture 6 data/index.js code, but slightly edited for my purposes.

const booksData = require('./books');
const reviewsData = require('./reviews');

module.exports = {
    books: booksData,
    reviews: reviewsData
};