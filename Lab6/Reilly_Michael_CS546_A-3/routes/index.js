// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

// Based on lecture 6 routes/index.js code, but slightly edited for my purposes.

const booksRoutes = require('./books');
const reviewsRoutes = require('./reviews');

const constructorMethod = (app) => {
    app.use('/books', booksRoutes);
    app.use('/reviews', reviewsRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Constructor is not books or reviews/:id, so not found' });
    });
};

module.exports = constructorMethod;