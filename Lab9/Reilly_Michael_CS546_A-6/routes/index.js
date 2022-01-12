var formRoutes = require('./form');

// Michael Reilly
// I pledge my honor that I have abided by the Stevens Honor System.

let constructorMethod = function constructorMethod(app) {
    app.use('/', formRoutes);
}

module.exports = constructorMethod;