// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

const mongoCollections = require('../config/mongoCollections');
const reviews = mongoCollections.reviews;
const books = require('./books');

let { ObjectId } = require('mongodb');

async function createReview(title, reviewer, rating, dateOfReview, review, bookId){
    // Error check all parameters
    if(title === undefined || title === null){
        throw 'No title is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.';
    }
    if(reviewer === undefined || reviewer === null){
        throw 'No reviewer is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.';
    }
    if(rating === undefined || rating === null){
        throw 'No rating is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.';
    }
    if(dateOfReview === undefined || dateOfReview === null){
        throw 'No dateOfReview is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.';
    }
    if(review === undefined || review === null){
        throw 'No review is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.';
    }
    if(bookId === undefined || bookId === null){
        throw 'No bookId is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.';
    }
    if(typeof title !== 'string'){
        throw 'Input title in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not of type string.';
    }
    if(title.length == 0){
        throw 'Input title in createReview(title, reviewer, rating, dateOfReview, review, bookId) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(title.replace(/\s/g, '').length == 0) {
        throw 'Input title in createReview(title, reviewer, rating, dateOfReview, review, bookId) is only empty spaces.';
    }
    if(typeof reviewer !== 'string'){
        throw 'Input reviewer in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not of type string.';
    }
    if(reviewer.length == 0){
        throw 'Input reviewer in createReview(title, reviewer, rating, dateOfReview, review, bookId) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(reviewer.replace(/\s/g, '').length == 0) {
        throw 'Input reviewer in createReview(title, reviewer, rating, dateOfReview, review, bookId) is only empty spaces.';
    }
    if(typeof rating !== 'number'){
        throw `Input rating in createReview(title, reviewer, rating, dateOfReview, review, bookId) value is not a number.`;
    }
    if(isNaN(rating)){
        throw `Input rating in createReview(title, reviewer, rating, dateOfReview, review, bookId) value is NaN.`;
    }
    if(typeof dateOfReview !== 'string'){
        throw 'Input dateOfReview in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not of passed in as type string.';
    }
    if(dateOfReview.length == 0){
        throw 'Input dateOfReview in createReview(title, reviewer, rating, dateOfReview, review, bookId) length is 0, empty string passed in.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(dateOfReview.replace(/\s/g, '').length == 0) {
        throw 'Input dateOfReview in createReview(title, reviewer, rating, dateOfReview, review, bookId) is only empty spaces passed in.';
    }
    if(!Date.parse(dateOfReview)){
        throw `Input dateOfReview in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not a valid date.`;
    }
    // Found the date regex on https://stackoverflow.com/questions/15196451/regular-expression-to-validate-datetime-format-mm-dd-yyyy
    let date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if(!dateOfReview.match(date_regex)){
        throw `Input dateOfReview in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not in the proper mm/dd/yyyy format.`;
    }
    if(typeof review !== 'string'){
        throw 'Input review in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not of type string.';
    }
    if(review.length == 0){
        throw 'Input review in createReview(title, reviewer, rating, dateOfReview, review, bookId) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(review.replace(/\s/g, '').length == 0) {
        throw 'Input review in createReview(title, reviewer, rating, dateOfReview, review, bookId) is only empty spaces.';
    }
    if(typeof bookId !== 'string'){
        throw 'Input bookId in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not of type string.';
    }
    if(bookId.length == 0){
        throw 'Input bookId in createReview(title, reviewer, rating, dateOfReview, review, bookId) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(bookId.replace(/\s/g, '').length == 0) {
        throw 'Input bookId in createReview(title, reviewer, rating, dateOfReview, review, bookId) is only empty spaces.';
    }

    let parsedId = ObjectId(bookId);

    // To double check conversion safely occurred:
    // found on https://stackoverflow.com/questions/44265981/what-is-the-difference-between-new-objectid-and-new-objectid-and-objectid
    if(!(parsedId instanceof ObjectId)){
        throw 'Input bookId in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not an instance of an ObjectId.';
    }

    const reviewsCollection = await reviews();

    const newReview = {
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review
    };

    const newInsertInformation = await reviewsCollection.insertOne(newReview);
    if(newInsertInformation.insertedCount === 0){
        throw "Creation Failed";
    }
    else{
        const newId = newInsertInformation.insertedId;

        await books.addReviewToBook(bookId, newId.toString(), title, reviewer, rating, dateOfReview, review);

        return await this.getReviewById(newId.toString());
    }
}

async function getAllReviews(bookId){
    if(bookId === undefined || bookId === null){
        throw 'No bookId parameter is given to the getAllReviews(bookId) function.';
    }
    if(typeof bookId !== 'string'){
        throw 'Input bookId in getAllReviews(bookId) is not of type string.';
    }
    if(bookId.length == 0){
        throw 'Input bookId in getAllReviews(bookId) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(bookId.replace(/\s/g, '').length == 0) {
        throw 'Input bookId in getAllReviews(bookId) is only empty spaces.';
    }

    let parsedId = ObjectId(bookId);

    // To double check conversion safely occurred:
    // found on https://stackoverflow.com/questions/44265981/what-is-the-difference-between-new-objectid-and-new-objectid-and-objectid
    if(!(parsedId instanceof ObjectId)){
        throw 'Input bookId in getAllReviews(bookId) is not an instance of an ObjectId.';
    }

    let book = await books.getBookById(bookId);
    if(book === undefined || book === null){
        throw 'Book not found.';
    }
    let final = book.reviews;
    if(final.length <= 0){
        throw 'Failed to get any reviews';
    }
    else{
        return final;
    }
}

async function getReviewById(id){
    // Error checking id parameter
    if(id === undefined || id === null){
        throw 'No id parameter is given to the getReviewById(id) function.';
    }
    if(typeof id !== 'string'){
        throw 'Input id in getReviewById(id) is not of type string.';
    }
    if(id.length == 0){
        throw 'Input id in getReviewById(id) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id.replace(/\s/g, '').length == 0) {
        throw 'Input id in getReviewById(id) is only empty spaces.';
    }

    let parsedId = ObjectId(id);

    // To double check conversion safely occurred:
    // found on https://stackoverflow.com/questions/44265981/what-is-the-difference-between-new-objectid-and-new-objectid-and-objectid
    if(!(parsedId instanceof ObjectId)){
        throw 'Input id in getReviewById(id) is not an instance of an ObjectId.';
    }

    let reviewCollection = await reviews();
    let review = await reviewCollection.findOne({ _id : parsedId });
    if(review === undefined || review === null){
        throw 'Could not find review with given id'
    }
    else{
        let final = {};
        final = review;
        final._id = id;
        final.dateOfReview = review.dateOfReview.toString();
        return final;
    }
}

async function deleteReview(id){
    // Error checking id parameter
    if(id === undefined || id === null){
        throw 'No id parameter is given to the deleteReview(id) function.';
    }
    if(typeof id !== 'string'){
        throw 'Input id in deleteReview(id) is not of type string.';
    }
    if(id.length == 0){
        throw 'Input id in deleteReview(id) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id.replace(/\s/g, '').length == 0) {
        throw 'Input id in deleteReview(id) is only empty spaces.';
    }

    let parsedId = ObjectId(id);

    // To double check conversion safely occurred:
    // found on https://stackoverflow.com/questions/44265981/what-is-the-difference-between-new-objectid-and-new-objectid-and-objectid
    if(!(parsedId instanceof ObjectId)){
        throw 'Input id in deleteReview(id) is not an instance of an ObjectId.';
    }

    const reviewCollection = await reviews();
    const review = await reviewCollection.findOne({ _id: parsedId });
    if(review === undefined || review === null){
        throw 'Book not found.';
    }
    else{
        const final = await books.removeReviewFromBook(id);
        return final;
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    deleteReview
}