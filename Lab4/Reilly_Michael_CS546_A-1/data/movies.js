const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;

let { ObjectId } = require('mongodb');

// Michael Reilly 10439198
// I pledge my honor that I have abided by the Stevens Honor System.

async function create(title, plot, rating, runtime, genre, cast, info){
    // Time for lots of error checking for all seven parameters.
    if(title === undefined || title === null){
        throw 'No title parameter is given to the create(title, plot, rating, runtime, genre, cast, info) function.';
    }
    if(plot === undefined || plot === null){
        throw 'No plot parameter is given to the create(title, plot, rating, runtime, genre, cast, info) function.';
    }
    if(rating === undefined || rating === null){
        throw 'No rating parameter is given to the create(title, plot, rating, runtime, genre, cast, info) function.';
    }
    if(runtime === undefined || runtime === null){
        throw 'No runtime parameter is given to the create(title, plot, rating, runtime, genre, cast, info) function.';
    }
    if(genre === undefined || genre === null){
        throw 'No genre parameter is given to the create(title, plot, rating, runtime, genre, cast, info) function.';
    }
    if(cast === undefined || cast === null){
        throw 'No cast parameter is given to the create(title, plot, rating, runtime, genre, cast, info) function.';
    }
    if(info === undefined || info === null){
        throw 'No info parameter is given to the create(title, plot, rating, runtime, genre, cast, info) function.';
    }
    if(typeof title !== 'string'){
        throw 'Input title in create(title, plot, rating, runtime, genre, cast, info) is not of type string.';
    }
    if(title.length == 0){
        throw 'Input title in create(title, plot, rating, runtime, genre, cast, info) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(title.replace(/\s/g, '').length == 0) {
        throw 'Input title in create(title, plot, rating, runtime, genre, cast, info) is only empty spaces.';
    }
    if(typeof plot !== 'string'){
        throw 'Input plot in create(title, plot, rating, runtime, genre, cast, info) is not of type string.';
    }
    if(plot.length == 0){
        throw 'Input plot in create(title, plot, rating, runtime, genre, cast, info) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(plot.replace(/\s/g, '').length == 0) {
        throw 'Input plot in create(title, plot, rating, runtime, genre, cast, info) is only empty spaces.';
    }
    if(typeof rating !== 'string'){
        throw 'Input rating in create(title, plot, rating, runtime, genre, cast, info) is not of type string.';
    }
    if(rating.length == 0){
        throw 'Input rating in create(title, plot, rating, runtime, genre, cast, info) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(rating.replace(/\s/g, '').length == 0) {
        throw 'Input rating in create(title, plot, rating, runtime, genre, cast, info) is only empty spaces.';
    }
    if(typeof runtime !== 'string'){
        throw 'Input runtime in create(title, plot, rating, runtime, genre, cast, info) is not of type string.';
    }
    if(runtime.length == 0){
        throw 'Input runtime in create(title, plot, rating, runtime, genre, cast, info) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(runtime.replace(/\s/g, '').length == 0) {
        throw 'Input runtime in create(title, plot, rating, runtime, genre, cast, info) is only empty spaces.';
    }
    if(typeof genre !== 'string'){
        throw 'Input genre in create(title, plot, rating, runtime, genre, cast, info) is not of type string.';
    }
    if(genre.length == 0){
        throw 'Input genre in create(title, plot, rating, runtime, genre, cast, info) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(genre.replace(/\s/g, '').length == 0) {
        throw 'Input genre in create(title, plot, rating, runtime, genre, cast, info) is only empty spaces.';
    }
    if(!Array.isArray(cast)){
        throw `Input cast to create(title, plot, rating, runtime, genre, cast, info) is not an array.`;
    }
    if(cast.length == 0){
        throw `Input cast to create(title, plot, rating, runtime, genre, cast, info) is an empty array.`;
    }
    for(let i in cast){
        if(typeof cast[i] !== 'string'){
            throw 'Not every index in input cast in create(title, plot, rating, runtime, genre, cast, info) is a string.';
        }
        if(cast[i].length == 0){
            throw 'An index in input cast in create(title, plot, rating, runtime, genre, cast, info) is a string og length 0, empty string.';
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(cast[i].replace(/\s/g, '').length == 0) {
            throw 'An index in input cast in create(title, plot, rating, runtime, genre, cast, info) is a string of just empty spaces.';
        }
    }
    if(typeof info !== 'object' || info === null){
        throw `Input info in create(title, plot, rating, runtime, genre, cast, info) is not an object.`;
    }
    if(info && Object.keys(info).length === 0 && info.constructor === Object){
        throw `Input info in create(title, plot, rating, runtime, genre, cast, info) does not have at least one key/value pair.`;
    }
    if(info.director === undefined || info.director === null){
        throw 'Input info in create(title, plot, rating, runtime, genre, cast, info) does not have key director.';
    }
    if(typeof info.director !== 'string'){
        throw 'The type of director key in input info in create(title, plot, rating, runtime, genre, cast, info) has value not of type string.';
    }
    if(info.director.length == 0){
        throw 'Key director in input info in create(title, plot, rating, runtime, genre, cast, info) has value of length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(info.director.replace(/\s/g, '').length == 0) {
        throw 'Key director in input info in create(title, plot, rating, runtime, genre, cast, info) has value of only empty spaces.';
    }
    if(info.yearReleased === undefined || info.yearReleased === null){
        throw 'Input info in create(title, plot, rating, runtime, genre, cast, info) does not have key yearReleased.';
    }
    if(typeof info.yearReleased !== 'number'){
        throw `Key yearReleased in input info in create(title, plot, rating, runtime, genre, cast, info) value is not a number.`;
    }
    if(isNaN(info.yearReleased)){
        throw `Key yearReleased in input info in create(title, plot, rating, runtime, genre, cast, info) value is NaN.`;
    }
    if(info.yearReleased.toString().length !== 4){
        throw 'Key yearReleased in input info in create(title, plot, rating, runtime, genre, cast, info) is not a number with only 4 digits.';
    }
    let currentYear = new Date().getFullYear();
    if(info.yearReleased < 1930 || info.yearRelease > currentYear+5){
        throw 'Key yearReleased in input info in create(title, plot, rating, runtime, genre, cast, info) has value that is not a valid year.'
    }

    // Following code is based on addDog(name, breeds) function from lecture 4 since they act very similarly.
    const movieCollection = await movies();

    let newMovie = {
        title: title,
        plot: plot,
        rating: rating,
        runtime: runtime,
        genre: genre,
        cast: cast,
        info: info
    };

    const insertionInfo = await movieCollection.insertOne(newMovie);
    if(insertionInfo.insertedCount === 0){
        throw 'Could not add new movie.';
    }

    // Need to make id into a string, as get requires a string not an ObjectId.
    const _id = insertionInfo.insertedId.toString();

    return await this.get(_id);
}

async function getAll(){
    // Following code is based on getAllDogs() function from lecture 4 since they act very similarly.
    const movieCollection = await movies();
    const movieList = await movieCollection.find({}).toArray();
    return movieList;
}

async function get(id){
    // Error check for id.
    if(id === undefined || id === null){
        throw 'No id parameter is given to the get(id) function.';
    }
    if(typeof id !== 'string'){
        throw 'Input id in get(id) is not of type string.';
    }
    if(id.length == 0){
        throw 'Input id in get(id) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id.replace(/\s/g, '').length == 0) {
        throw 'Input id in get(id) is only empty spaces.';
    }

    // Convert string to ObjectId, throws error if invalid
    // Given in Lab 4 instructions
    let parsedId = ObjectId(id);

    // To double check conversion safely occurred:
    // found on https://stackoverflow.com/questions/44265981/what-is-the-difference-between-new-objectid-and-new-objectid-and-objectid
    if(!(parsedId instanceof ObjectId)){
        throw 'Input id in get(id) is not an instance of an ObjectId.';
    }

    // Following code is based on getDogById(id) function from lecture 4 since they act very similarly.
    const movieCollection = await movies();
    const movie = await movieCollection.findOne({ _id: parsedId });
    if(movie === null || movie === undefined){
        throw 'No movie with that given id.';
    }

    return movie;
}

async function remove(id){
    // Error check for id.
    if(id === undefined || id === null){
        throw 'No id parameter is given to the remove(id) function.';
    }
    if(typeof id !== 'string'){
        throw 'Input id in remove(id) is not of type string.';
    }
    if(id.length == 0){
        throw 'Input id in remove(id) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id.replace(/\s/g, '').length == 0) {
        throw 'Input id in remove(id) is only empty spaces.';
    }

    // Convert string to ObjectId, throws error if invalid
    // Given in Lab 4 instructions
    let parsedId = ObjectId(id);

    // To double check conversion safely occurred:
    // found on https://stackoverflow.com/questions/44265981/what-is-the-difference-between-new-objectid-and-new-objectid-and-objectid
    if(!(parsedId instanceof ObjectId)){
        throw 'Input id in remove(id) is not an instance of an ObjectId.';
    }

    // Following code based on removeDog(id) function from lecture 4 since they act similarly.
    const movieCollection = await movies();

    // Get temp of the movie for it's title during the return.
    const movie = await get(id);

    const deleteInfo = await movieCollection.deleteOne({ _id: parsedId });

    if(deleteInfo.deletedCount === 0){
        throw 'Could not delete movie with that given id.';
    }

    return movie.title + " has been successfully deleted.";
}

async function rename(id, newTitle){
    // Error check for id.
    if(id === undefined || id === null){
        throw 'No id parameter is given to the rename(id, newTitle) function.';
    }
    if(typeof id !== 'string'){
        throw 'Input id in rename(id, newTitle) is not of type string.';
    }
    if(id.length == 0){
        throw 'Input id in rename(id, newTitle) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id.replace(/\s/g, '').length == 0) {
        throw 'Input id in rename(id, newTitle) is only empty spaces.';
    }

    // Convert string to ObjectId, throws error if invalid
    // Given in Lab 4 instructions
    let parsedId = ObjectId(id);

    // To double check conversion safely occurred:
    // found on https://stackoverflow.com/questions/44265981/what-is-the-difference-between-new-objectid-and-new-objectid-and-objectid
    if(!(parsedId instanceof ObjectId)){
        throw 'Input id in rename(id, newTitle) is not an instance of an ObjectId.';
    }

    // Error check for newTitle.
    if(newTitle === undefined || newTitle === null){
        throw 'No newTitle parameter is given to the rename(id, newTitle) function.'
    }
    if(typeof newTitle !== 'string'){
        throw 'Input newTitle in rename(id, newTitle) is not of type string.';
    }
    if(newTitle.length == 0){
        throw 'Input newTitle in rename(id, newTitle) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(newTitle.replace(/\s/g, '').length == 0) {
        throw 'Input newTitle in rename(id, newTitle) is only empty spaces.';
    }

    // Following code is based on updateDog(id, name, breeds) function from lecture 4 because they act similarly.
    const movieCollection = await movies();

    // Get movie so the values in it can be replaced.
    let updatedMovie = await get(id);

    updatedMovie.title = newTitle;

    // https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp To update a specific part of the object.
    const updatedInfo = await movieCollection.updateOne(
        { _id: parsedId },
        { $set: updatedMovie }
    );
    if(updatedInfo.modifiedCount === 0){
        throw 'Could not update movie successfully';
    }

    return await this.get(id);
}

module.exports = {
    create,
    getAll,
    get,
    remove,
    rename
};