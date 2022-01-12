// Michael Reilly 10439198
// I pledge my honor that I have abided by the Stevens Honor System.

// As stated in the Lab 4 directions, this is from the lecture code, but slightly edited for my purposes.

const dbConnection = require('./mongoConnection');

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
  movies: getCollectionFn('movies'),
};