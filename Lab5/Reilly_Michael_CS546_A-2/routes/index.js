// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

// Based on lecture 5 routes/index.js code

const showsRoutes = require('./shows');
const aboutmeRoutes = require('./aboutme');

const constructorMethod = (app) => {
    app.use('/shows', showsRoutes);
    app.use('/aboutme', aboutmeRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Constructor is not shows or aboutme, so not found' });
    });
};

module.exports = constructorMethod;