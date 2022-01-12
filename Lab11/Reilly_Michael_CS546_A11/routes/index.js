const showRoutes = require('./shows');

const constructorMethod = (app) => {
  app.use('/', showRoutes);
};

module.exports = constructorMethod;