// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;

let { ObjectId } = require('mongodb');

async function createBook(title, author, genre, datePublished, summary){
    // Error check all 5 parameters
    if(title === undefined || title === null){
        throw 'No title parameter is given to the createBook(title, author, genre, datePublished, summary) function.';
    }
    if(author === undefined || author === null){
        throw 'No author parameter is given to the createBook(title, author, genre, datePublished, summary) function.';
    }
    if(genre === undefined || genre === null){
        throw 'No genre parameter is given to the createBook(title, author, genre, datePublished, summary) function.';
    }
    if(datePublished === undefined || datePublished === null){
        throw 'No datePublished parameter is given to the createBook(title, author, genre, datePublished, summary) function.';
    }
    if(summary === undefined || summary === null){
        throw 'No summary parameter is given to the createBook(title, author, genre, datePublished, summary) function.';
    }
    if(typeof title !== 'string'){
        throw 'Input title in createBook(title, author, genre, datePublished, summary) is not of type string.';
    }
    if(title.length == 0){
        throw 'Input title in createBook(title, author, genre, datePublished, summary) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(title.replace(/\s/g, '').length == 0) {
        throw 'Input title in createBook(title, author, genre, datePublished, summary) is only empty spaces.';
    }
    if(typeof author !== 'object'){
        throw `Input author in createBook(title, author, genre, datePublished, summary) is not an object.`;
    }
    if(author && Object.keys(author) === 0 && author.constructor === Object){
        throw `Input author in createBook(title, author, genre, datePublished, summary) is an empty object.`;
    }
    if(!('authorFirstName' in author)){
        throw `Input author in createBook(title, author, genre, datePublished, summary) does not contain key authorFirstName.`;
    }
    if(!('authorLastName' in author)){
        throw `Input author in createBook(title, author, genre, datePublished, summary) does not contain key authorLastName.`;
    }
    if(typeof author.authorFirstName !== 'string'){
        throw 'Value of key authorFirstName in createBook(title, author, genre, datePublished, summary) is not of type string.';
    }
    if(author.authorFirstName.length == 0){
        throw 'Value of key authorFirstName in createBook(title, author, genre, datePublished, summary) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(author.authorFirstName.replace(/\s/g, '').length == 0) {
        throw 'Value of key authorFirstName in createBook(title, author, genre, datePublished, summary) is only empty spaces.';
    }
    if(typeof author.authorLastName !== 'string'){
        throw 'Value of key authorLastName in createBook(title, author, genre, datePublished, summary) is not of type string.';
    }
    if(author.authorLastName == 0){
        throw 'Value of key authorLastName in createBook(title, author, genre, datePublished, summary) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(author.authorLastName.replace(/\s/g, '').length == 0) {
        throw 'Value of key authorLastName in createBook(title, author, genre, datePublished, summary) is only empty spaces.';
    }
    if(!Array.isArray(genre)){
        throw `Input genre in createBook(title, author, genre, datePublished, summary) is not an array.`;
    }
    if(genre.length == 0){
        throw `Input genre in createBook(title, author, genre, datePublished, summary) is an empty array.`;
    }
    for(let book in genre){
        if(typeof genre[book] !== 'string'){
            throw 'Input genre has index in createBook(title, author, genre, datePublished, summary) is not of type string.';
        }
        if(genre[book].length == 0){
            throw 'Input genre has index in createBook(title, author, genre, datePublished, summary) length is 0, empty string.';
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(genre[book].replace(/\s/g, '').length == 0) {
            throw 'Input genre has index in createBook(title, author, genre, datePublished, summary) is only empty spaces.';
        }
    }
    if(typeof datePublished !== 'string'){
        throw 'Input datePublished in createBook(title, author, genre, datePublished, summary) is not of passed in as type string.';
    }
    if(datePublished.length == 0){
        throw 'Input datePublished in createBook(title, author, genre, datePublished, summary) length is 0, empty string passed in.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(datePublished.replace(/\s/g, '').length == 0) {
        throw 'Input datePublished in createBook(title, author, genre, datePublished, summary) is only empty spaces passed in.';
    }
    if(!Date.parse(datePublished)){
        throw `Input datePublished in createBook(title, author, genre, datePublished, summary) is not a valid date.`;
    }
    // Found the date regex on https://stackoverflow.com/questions/15196451/regular-expression-to-validate-datetime-format-mm-dd-yyyy
    let date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if(!datePublished.match(date_regex)){
        throw `Input datePublished in createBook(title, author, genre, datePublished, summary) is not in the proper mm/dd/yyyy format.`;
    }
    if(typeof summary !== 'string'){
        throw 'Input summary in createBook(title, author, genre, datePublished, summary) is not of type string.';
    }
    if(summary.length == 0){
        throw 'Input summary in createBook(title, author, genre, datePublished, summary) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(summary.replace(/\s/g, '').length == 0) {
        throw 'Input summary in createBook(title, author, genre, datePublished, summary) is only empty spaces.';
    }

    const booksCollection = await books();

    let newBook = {
        title: title,
        author: author,
        genre: genre,
        datePublished: datePublished,
        summary: summary,
        reviews: []
    };

    const insertInformation = await booksCollection.insertOne(newBook);
    if(insertInformation.insertedCount === 0){
        throw "Creation Failed";
    }
    else{
        return await this.getBookById(insertInformation.insertedId.toString());
    }
}

async function getAllBooks(){
    const booksCollection = await books();
    const booksList = await booksCollection.find({}).toArray();
    if(!booksList){
        throw `No books in the database.`;
    }
    else{
        let final = [];
        booksList.forEach((book) => {
            final.push({ _id: book._id.toString(), title: book.title });
        })
        return final;
    }
}

async function getBookById(id){
    // Error checking for id
    if(id === undefined || id === null){
        throw 'No id parameter is given to the getBookById(id) function.';
    }
    if(typeof id !== 'string'){
        throw 'Input id in getBookById(id) is not of type string.';
    }
    if(id.length == 0){
        throw 'Input id in getBookById(id) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id.replace(/\s/g, '').length == 0) {
        throw 'Input id in getBookById(id) is only empty spaces.';
    }

    let parsedId = ObjectId(id);

    // To double check conversion safely occurred:
    // found on https://stackoverflow.com/questions/44265981/what-is-the-difference-between-new-objectid-and-new-objectid-and-objectid
    if(!(parsedId instanceof ObjectId)){
        throw 'Input id in getBookById(id) is not an instance of an ObjectId.';
    }

    const booksCollection = await books();
    const book = await booksCollection.findOne({ _id: parsedId });
    if(book === undefined || book === null){
        throw 'Book not found.';
    }
    else{
        let final = book;
        final._id=book._id.toString();
        return final;
    }
}

async function updateBook(id, updatedBooks){
    const updatedBooksData = {};
    if(id === undefined || id === null){
        throw 'No id parameter is given to the getBookById(id) function.';
    }
    if(typeof id !== 'string'){
        throw 'Input id in getBookById(id) is not of type string.';
    }
    if(id.length == 0){
        throw 'Input id in getBookById(id) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id.replace(/\s/g, '').length == 0) {
        throw 'Input id in getBookById(id) is only empty spaces.';
    }
    if(updatedBooks.title !== null && updatedBooks.title !== undefined){
        if(updatedBooks.title === undefined || updatedBooks.title === null){
            throw 'No title parameter is given to the createBook(title, author, genre, datePublished, summary) function.';
        }
        if(typeof updatedBooks.title !== 'string'){
            throw 'Input title in createBook(title, author, genre, datePublished, summary) is not of type string.';
        }
        if(updatedBooks.title.length == 0){
            throw 'Input title in createBook(title, author, genre, datePublished, summary) length is 0, empty string.';
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(updatedBooks.title.replace(/\s/g, '').length == 0) {
            throw 'Input title in createBook(title, author, genre, datePublished, summary) is only empty spaces.';
        }
    }
    if(updatedBooks.author !== undefined && updatedBooks.author !== null){
        if(typeof updatedBooks.author !== 'object'){
            throw `Input author in createBook(title, author, genre, datePublished, summary) is not an object.`;
        }
        if(updatedBooks.author && Object.keys(updatedBooks.author) === 0 && updatedBooks.author.constructor === Object){
            throw `Input author in createBook(title, author, genre, datePublished, summary) is an empty object.`;
        }
        if(!('authorFirstName' in updatedBooks.author)){
            throw `Input author in createBook(title, author, genre, datePublished, summary) does not contain key authorFirstName.`;
        }
        if(!('authorLastName' in updatedBooks.author)){
            throw `Input author in createBook(title, author, genre, datePublished, summary) does not contain key authorLastName.`;
        }
        if(typeof updatedBooks.author.authorFirstName !== 'string'){
            throw 'Value of key authorFirstName in createBook(title, author, genre, datePublished, summary) is not of type string.';
        }
        if(updatedBooks.author.authorFirstName.length == 0){
            throw 'Value of key authorFirstName in createBook(title, author, genre, datePublished, summary) length is 0, empty string.';
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(updatedBooks.author.authorFirstName.replace(/\s/g, '').length == 0) {
            throw 'Value of key authorFirstName in createBook(title, author, genre, datePublished, summary) is only empty spaces.';
        }
        if(typeof updatedBooks.author.authorLastName !== 'string'){
            throw 'Value of key authorLastName in createBook(title, author, genre, datePublished, summary) is not of type string.';
        }
        if(updatedBooks.author.authorLastName == 0){
            throw 'Value of key authorLastName in createBook(title, author, genre, datePublished, summary) length is 0, empty string.';
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(updatedBooks.author.authorLastName.replace(/\s/g, '').length == 0) {
            throw 'Value of key authorLastName in createBook(title, author, genre, datePublished, summary) is only empty spaces.';
        }
    }
    if(updatedBooks.genre !== null && updatedBooks.genre !== undefined){
        if(!Array.isArray(updatedBooks.genre)){
            throw `Input genre in createBook(title, author, genre, datePublished, summary) is not an array.`;
        }
        if(updatedBooks.genre.length == 0){
            throw `Input genre in createBook(title, author, genre, datePublished, summary) is an empty array.`;
        }
        for(let book in updatedBooks.genre){
            if(typeof updatedBooks.genre[book] !== 'string'){
                throw 'Input genre has index in createBook(title, author, genre, datePublished, summary) is not of type string.';
            }
            if(updatedBooks.genre[book].length == 0){
                throw 'Input genre has index in createBook(title, author, genre, datePublished, summary) length is 0, empty string.';
            }
            // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
            if(updatedBooks.genre[book].replace(/\s/g, '').length == 0) {
                throw 'Input genre has index in createBook(title, author, genre, datePublished, summary) is only empty spaces.';
            }
        }
    }
    if(updatedBooks.datePublished !== undefined && updatedBooks.datePublished !== null){
        if(typeof updatedBooks.datePublished !== 'string'){
            throw 'Input datePublished in createBook(title, author, genre, datePublished, summary) is not of passed in as type string.';
        }
        if(updatedBooks.datePublished.length == 0){
            throw 'Input datePublished in createBook(title, author, genre, datePublished, summary) length is 0, empty string passed in.';
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(updatedBooks.datePublished.replace(/\s/g, '').length == 0) {
            throw 'Input datePublished in createBook(title, author, genre, datePublished, summary) is only empty spaces passed in.';
        }
        if(!Date.parse(updatedBooks.datePublished)){
            throw `Input datePublished in createBook(title, author, genre, datePublished, summary) is not a valid date.`;
        }
        // Found the date regex on https://stackoverflow.com/questions/15196451/regular-expression-to-validate-datetime-format-mm-dd-yyyy
        let date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        if(!updatedBooks.datePublished.match(date_regex)){
            throw `Input datePublished in createBook(title, author, genre, datePublished, summary) is not in the proper mm/dd/yyyy format.`;
        }
    }
    if(updatedBooks.summary !== undefined && updatedBooks.summary !== null){
        if(typeof updatedBooks.summary !== 'string'){
            throw 'Input summary in createBook(title, author, genre, datePublished, summary) is not of type string.';
        }
        if(updatedBooks.summary.length == 0){
            throw 'Input summary in createBook(title, author, genre, datePublished, summary) length is 0, empty string.';
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(updatedBooks.summary.replace(/\s/g, '').length == 0) {
            throw 'Input summary in createBook(title, author, genre, datePublished, summary) is only empty spaces.';
        }
    }

    let updateData = Object.assign(updatedBooksData, updatedBooks)

    let parsedId = ObjectId(id);

    // To double check conversion safely occurred:
    // found on https://stackoverflow.com/questions/44265981/what-is-the-difference-between-new-objectid-and-new-objectid-and-objectid
    if(!(parsedId instanceof ObjectId)){
        throw 'Input id in updateBook(id, updatedBooks) is not an instance of an ObjectId.';
    }

    const booksCollection = await books();
    const book = await booksCollection.findOne({ _id: parsedId });
    if(book === undefined || book === null){
        throw 'Book not found.';
    }

    const updateInfo = await booksCollection.updateOne(
        { _id: parsedId },
        { $set: updateData }
    );
    if(!updateInfo.matchedCount && !updateInfo.modifiedCount){
        throw 'Update failed';
    }
    else{
        return await this.getBookById(id.toString());
    }
}

async function deleteBook(id){
    // Error checking for id
    if(id === undefined || id === null){
        throw 'No id parameter is given to the deleteBook(id) function.';
    }
    if(typeof id !== 'string'){
        throw 'Input id in deleteBook(id) is not of type string.';
    }
    if(id.length == 0){
        throw 'Input id in deleteBook(id) length is 0, empty string.';
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id.replace(/\s/g, '').length == 0) {
        throw 'Input id in deleteBook(id) is only empty spaces.';
    }

    let parsedId = ObjectId(id);

    // To double check conversion safely occurred:
    // found on https://stackoverflow.com/questions/44265981/what-is-the-difference-between-new-objectid-and-new-objectid-and-objectid
    if(!(parsedId instanceof ObjectId)){
        throw 'Input id in deleteBook(id) is not an instance of an ObjectId.';
    }

    const booksCollection = await books();
    const book = await booksCollection.findOne({ _id: parsedId });
    if(book === undefined || book === null){
        throw 'Book not found.';
    }

    const deletionInfo = await booksCollection.removeOne({ _id: parsedId });
    if(deletionInfo.deletedCount === 0){
        throw "Could not delete book";
    }
    else{
        return {"bookId": id, "deleted": true};
    }
}

async function addReviewToBook(bookId, newId, title, reviewer, rating, dateOfReview, review){

    let parsedId = ObjectId(bookId);
    let parsedId2 = ObjectId(newId)

    const bookCollection = await books();
    const updateInfo = await bookCollection.updateOne(
        { _id: parsedId },
        { $addToSet: { reviews: 
            { _id: parsedId2, 
            title: title, 
            reviewer: reviewer, 
            rating: rating,
            dateOfReview: dateOfReview,
            review: review }
        }}
    )
    if(!updateInfo.matchedCount && !updateInfo.modifiedCount){
        throw 'Failed to Update';
    }
    else{
        return await this.getBookById(bookId);
    }
}

async function removeReviewFromBook(reviewId){
    const bookCollection = await books();
    let parsedId = ObjectId(reviewId);

    const updateInfo = await bookCollection.updateOne(
        { "reviews._id": parsedId },
        { $pull: { reviews: { _id: parsedId }}}
    )
    if(!updateInfo.matchedCount && !updateInfo.modifiedCount){
        throw 'Remove Failed';
    }
    else{
        return {"reviewId": reviewId, "deleted": true};
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    addReviewToBook,
    removeReviewFromBook
}