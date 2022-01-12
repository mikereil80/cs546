// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

const express = require('express');
const router = express.Router();
const booksData = require('../data/books');

router.get('/', async (req, res) => {
    try {
      const booksList = await booksData.getAllBooks();
      res.status(200).json(booksList);
    } catch (e) {
      res.status(500).json({ error: 'Could not get books' });
    }
  });
  
router.post('/', async (req, res) => {
    const booksCreateData = req.body;
    if(booksCreateData.title === undefined || booksCreateData.title === null){
        res.status(400).json({ error: 'No title parameter is given to the createBook(title, author, genre, datePublished, summary) function.' });
        return;
    }
    if(booksCreateData.author === undefined || booksCreateData.author === null){
        res.status(400).json({ error: 'No author parameter is given to the createBook(title, author, genre, datePublished, summary) function.' });
        return;
    }
    if(booksCreateData.genre === undefined || booksCreateData.genre === null){
        res.status(400).json({ error: 'No genre parameter is given to the createBook(title, author, genre, datePublished, summary) function.' });
        return;
    }
    if(booksCreateData.datePublished === undefined || booksCreateData.datePublished === null){
        res.status(400).json({ error: 'No datePublished parameter is given to the createBook(title, author, genre, datePublished, summary) function.' });
        return;
    }
    if(booksCreateData.summary === undefined || booksCreateData.summary === null){
        res.status(400).json({ error: 'No summary parameter is given to the createBook(title, author, genre, datePublished, summary) function.' });
        return;
    }
    if(typeof booksCreateData.title !== 'string'){
        res.status(400).json({ error: 'Input title in createBook(title, author, genre, datePublished, summary) is not of type string.' });
        return;
    }
    if(booksCreateData.title.length == 0){
        res.status(400).json({ error: 'Input title in createBook(title, author, genre, datePublished, summary) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(booksCreateData.title.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input title in createBook(title, author, genre, datePublished, summary) is only empty spaces.' });
        return;
    }
    if(typeof booksCreateData.author !== 'object'){
        res.status(400).json({ error: `Input author in createBook(title, author, genre, datePublished, summary) is not an object.` });
        return;
    }
    if(booksCreateData.author && Object.keys(booksCreateData.author) === 0 && booksCreateData.author.constructor === Object){
        res.status(400).json({ error: `Input author in createBook(title, author, genre, datePublished, summary) is an empty object.` });
        return;
    }
    if(!('authorFirstName' in booksCreateData.author)){
        res.status(400).json({ error: `Input author in createBook(title, author, genre, datePublished, summary) does not contain key authorFirstName.`});
        return;
    }
    if(!('authorLastName' in booksCreateData.author)){
        res.status(400).json({ error: `Input author in createBook(title, author, genre, datePublished, summary) does not contain key authorLastName.`});
        return;
    }
    if(typeof booksCreateData.author.authorFirstName !== 'string'){
        res.status(400).json({ error: 'Value of key authorFirstName in createBook(title, author, genre, datePublished, summary) is not of type string.' });
        return;
    }
    if(booksCreateData.author.authorFirstName.length == 0){
        res.status(400).json({ error: 'Value of key authorFirstName in createBook(title, author, genre, datePublished, summary) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(booksCreateData.author.authorFirstName.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Value of key authorFirstName in createBook(title, author, genre, datePublished, summary) is only empty spaces.' });
        return;
    }
    if(typeof booksCreateData.author.authorLastName !== 'string'){
        res.status(400).json({ error: 'Value of key authorLastName in createBook(title, author, genre, datePublished, summary) is not of type string.' });
        return;
    }
    if(booksCreateData.author.authorLastName.length == 0){
        res.status(400).json({ error: 'Value of key authorLastName in createBook(title, author, genre, datePublished, summary) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(booksCreateData.author.authorLastName.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Value of key authorLastName in createBook(title, author, genre, datePublished, summary) is only empty spaces.' });
        return;
    }
    if(!Array.isArray(booksCreateData.genre)){
        res.status(400).json({ error: `Input genre in createBook(title, author, genre, datePublished, summary) is not an array.` });
        return;
    }
    if(booksCreateData.genre.length == 0){
        res.status(400).json({ error: `Input genre in createBook(title, author, genre, datePublished, summary) is an empty array.` });
        return;
    }
    for(let book in booksCreateData.genre){
        if(typeof booksCreateData.genre[book] !== 'string'){
            res.status(400).json({ error: 'Input genre has index in createBook(title, author, genre, datePublished, summary) is not of type string.' });
            return;
        }
        if(booksCreateData.genre[book].length == 0){
            res.status(400).json({ error: 'Input genre has index in createBook(title, author, genre, datePublished, summary) length is 0, empty string.' });
            return;
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(booksCreateData.genre[book].replace(/\s/g, '').length == 0) {
            res.status(400).json({ error: 'Input genre has index in createBook(title, author, genre, datePublished, summary) is only empty spaces.' });
            return;
        }
    }
    if(typeof booksCreateData.datePublished !== 'string'){
        res.status(400).json({ error: 'Input datePublished in createBook(title, author, genre, datePublished, summary) is not of passed in as type string.' });
        return;
    }
    if(booksCreateData.datePublished.length == 0){
        res.status(400).json({ error: 'Input datePublished in createBook(title, author, genre, datePublished, summary) length is 0, empty string passed in.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(booksCreateData.datePublished.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input datePublished in createBook(title, author, genre, datePublished, summary) is only empty spaces passed in.' });
        return;
    }
    if(!Date.parse(booksCreateData.datePublished)){
        res.status(400).json({ error: `Input datePublished in createBook(title, author, genre, datePublished, summary) is not a valid date.` });
        return;
    }
    // Found the date regex on https://stackoverflow.com/questions/15196451/regular-expression-to-validate-datetime-format-mm-dd-yyyy
    let date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if(!booksCreateData.datePublished.match(date_regex)){
        res.status(400).json({ error: `Input datePublished in createBook(title, author, genre, datePublished, summary) is not in the proper mm/dd/yyyy format.` });
        return;
    }
    if(typeof booksCreateData.summary !== 'string'){
        res.status(400).json({ error: 'Input summary in createBook(title, author, genre, datePublished, summary) is not of type string.' });
        return;
    }
    if(booksCreateData.summary.length == 0){
        res.status(400).json({ error: 'Input summary in createBook(title, author, genre, datePublished, summary) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(booksCreateData.summary.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input summary in createBook(title, author, genre, datePublished, summary) is only empty spaces.' });
        return;
    }
    try {
        const { title, author, genre, datePublished, summary } = booksCreateData;
        const newBook = await booksData.createBook(title, author, genre, datePublished, summary);
        res.status(200).json(newBook);
    } catch (e) {
        res.status(500).json({ error: "Could not create book." });
    }
});

router.get('/:id', async (req, res) => {
    try{
        let id_string = req.params.id.toString();
        if(id_string === undefined || id_string === null){
            res.status(400).json({ error: 'No id parameter is given to the getBookById(id) function.' });
            return;
        }
        if(typeof id_string !== 'string'){
            res.status(400).json({ error: 'Input id in getBookById(id) is not of type string.' });
            return;
        }
        if(id_string.length == 0){
            res.status(400).json({ error: 'Input id in getBookById(id) length is 0, empty string.' });
            return;
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(id_string.replace(/\s/g, '').length == 0) {
            res.status(400).json({ error: 'Input id in getBookById(id) is only empty spaces.' });
            return;
        }
        const book = await booksData.getBookById(req.params.id.toString());
        res.status(200).json(book);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
    }
});

router.put('/:id', async (req, res) => {
    let id_string = req.params.id.toString();
    if(id_string === undefined || id_string === null){
        res.status(400).json({ error: 'No id parameter is given to the getBookById(id) function.' });
        return;
    }
    if(typeof id_string !== 'string'){
        res.status(400).json({ error: 'Input id in getBookById(id) is not of type string.' });
        return;
    }
    if(id_string.length == 0){
        res.status(400).json({ error: 'Input id in getBookById(id) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id_string.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input id in getBookById(id) is only empty spaces.' });
        return;
    }
    const booksCreateData = req.body;
    if(booksCreateData.title === undefined || booksCreateData.title === null){
        res.status(400).json({ error: 'No title parameter is given to the updateBook(id, updatedBooks) function.' });
        return;
    }
    if(booksCreateData.author === undefined || booksCreateData.author === null){
        res.status(400).json({ error: 'No author parameter is given to the updateBook(id, updatedBooks) function.' });
        return;
    }
    if(booksCreateData.genre === undefined || booksCreateData.genre === null){
        res.status(400).json({ error: 'No genre parameter is given to the updateBook(id, updatedBooks) function.' });
        return;
    }
    if(booksCreateData.datePublished === undefined || booksCreateData.datePublished === null){
        res.status(400).json({ error: 'No datePublished parameter is given to the updateBook(id, updatedBooks) function.' });
        return;
    }
    if(booksCreateData.summary === undefined || booksCreateData.summary === null){
        res.status(400).json({ error: 'No summary parameter is given to the updateBook(id, updatedBooks) function.' });
        return;
    }
    if(typeof booksCreateData.title !== 'string'){
        res.status(400).json({ error: 'Input title in updateBook(id, updatedBooks) is not of type string.' });
        return;
    }
    if(booksCreateData.title.length == 0){
        res.status(400).json({ error: 'Input title in updateBook(id, updatedBooks) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(booksCreateData.title.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input title in updateBook(id, updatedBooks) is only empty spaces.' });
        return;
    }
    if(typeof booksCreateData.author !== 'object'){
        res.status(400).json({ error: `Input author in updateBook(id, updatedBooks) is not an object.` });
        return;
    }
    if(booksCreateData.author && Object.keys(booksCreateData.author) === 0 && booksCreateData.author.constructor === Object){
        res.status(400).json({ error: `Input author in updateBook(id, updatedBooks) is an empty object.` });
        return;
    }
    if(!('authorFirstName' in booksCreateData.author)){
        res.status(400).json({ error: `Input author in updateBook(id, updatedBooks) does not contain key authorFirstName.`});
        return;
    }
    if(!('authorLastName' in booksCreateData.author)){
        res.status(400).json({ error: `Input author in updateBook(id, updatedBooks) does not contain key authorLastName.`});
        return;
    }
    if(typeof booksCreateData.author.authorFirstName !== 'string'){
        res.status(400).json({ error: 'Value of key authorFirstName in updateBook(id, updatedBooks) is not of type string.' });
        return;
    }
    if(booksCreateData.author.authorFirstName.length == 0){
        res.status(400).json({ error: 'Value of key authorFirstName in updateBook(id, updatedBooks) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(booksCreateData.author.authorFirstName.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Value of key authorFirstName in updateBook(id, updatedBooks) is only empty spaces.' });
        return;
    }
    if(typeof booksCreateData.author.authorLastName !== 'string'){
        res.status(400).json({ error: 'Value of key authorLastName in updateBook(id, updatedBooks) is not of type string.' });
        return;
    }
    if(booksCreateData.author.authorLastName.length == 0){
        res.status(400).json({ error: 'Value of key authorLastName in updateBook(id, updatedBooks) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(booksCreateData.author.authorLastName.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Value of key authorLastName in updateBook(id, updatedBooks) is only empty spaces.' });
        return;
    }
    if(!Array.isArray(booksCreateData.genre)){
        res.status(400).json({ error: `Input genre in updateBook(id, updatedBooks) is not an array.` });
        return;
    }
    if(booksCreateData.genre.length == 0){
        res.status(400).json({ error: `Input genre in updateBook(id, updatedBooks) is an empty array.` });
        return;
    }
    for(let book in booksCreateData.genre){
        if(typeof booksCreateData.genre[book] !== 'string'){
            res.status(400).json({ error: 'Input genre has index in updateBook(id, updatedBooks) is not of type string.' });
            return;
        }
        if(booksCreateData.genre[book].length == 0){
            res.status(400).json({ error: 'Input genre has index in updateBook(id, updatedBooks) length is 0, empty string.' });
            return;
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(booksCreateData.genre[book].replace(/\s/g, '').length == 0) {
            res.status(400).json({ error: 'Input genre has index in updateBook(id, updatedBooks) is only empty spaces.' });
            return;
        }
    }
    if(typeof booksCreateData.datePublished !== 'string'){
        res.status(400).json({ error: 'Input datePublished in updateBook(id, updatedBooks) is not of passed in as type string.' });
        return;
    }
    if(booksCreateData.datePublished.length == 0){
        res.status(400).json({ error: 'Input datePublished in updateBook(id, updatedBooks) length is 0, empty string passed in.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(booksCreateData.datePublished.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input datePublished in updateBook(id, updatedBooks) is only empty spaces passed in.' });
        return;
    }
    if(!Date.parse(booksCreateData.datePublished)){
        res.status(400).json({ error: `Input datePublished in updateBook(id, updatedBooks) is not a valid date.` });
        return;
    }
    // Found the date regex on https://stackoverflow.com/questions/15196451/regular-expression-to-validate-datetime-format-mm-dd-yyyy
    let date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if(!booksCreateData.datePublished.match(date_regex)){
        res.status(400).json({ error: `Input datePublished in updateBook(id, updatedBooks) is not in the proper mm/dd/yyyy format.` });
        return;
    }
    if(typeof booksCreateData.summary !== 'string'){
        res.status(400).json({ error: 'Input summary in updateBook(id, updatedBooks) is not of type string.' });
        return;
    }
    if(booksCreateData.summary.length == 0){
        res.status(400).json({ error: 'Input summary in updateBook(id, updatedBooks) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(booksCreateData.summary.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input summary in updateBook(id, updatedBooks) is only empty spaces.' });
        return;
    }

    try {
        await booksData.getBookById(req.params.id.toString());
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }

    try {
        const updatedBook = await booksData.updateBook(req.params.id.toString(), booksCreateData);
        res.json(updatedBook);
    } catch (e) {
        res.status(500).json({ error: 'Book not updated' });
    }
});

router.patch('/:id', async (req, res) => {
    let id_string = req.params.id.toString();
    if(id_string === undefined || id_string === null){
        res.status(400).json({ error: 'No id parameter is given to the getBookById(id) function.' });
        return;
    }
    if(typeof id_string !== 'string'){
        res.status(400).json({ error: 'Input id in getBookById(id) is not of type string.' });
        return;
    }
    if(id_string.length == 0){
        res.status(400).json({ error: 'Input id in getBookById(id) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id_string.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input id in getBookById(id) is only empty spaces.' });
        return;
    }
    const booksCreateData = req.body;
    let updatedObject = {};
    try {
        const oldBook = await booksData.getBookById(req.params.id.toString());
        if (booksCreateData.title && booksCreateData.title !== oldBook.title){
            updatedObject.title = booksCreateData.title;
        }
        if (booksCreateData.author && booksCreateData.author !== oldBook.author){
            updatedObject.author = booksCreateData.author;
        }
        if (booksCreateData.genre && booksCreateData.genre !== oldBook.genre){
            updatedObject.genre = booksCreateData.genre;
        }
        if (booksCreateData.datePublished && booksCreateData.datePublished !== oldBook.datePublished){
            updatedObject.datePublished = booksCreateData.datePublished;
        }
        if (booksCreateData.summary && booksCreateData.summary !== oldBook.summary){
            updatedObject.summary = booksCreateData.summary;
        }
        if (booksCreateData.reviews && booksCreateData.reviews !== oldBook.reviews){
            res.status(404)({ error: 'Cannot change reviews' });
            return;
        }
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    if (Object.keys(updatedObject).length !== 0) {
        try {
            const updatedBook = await booksData.updateBook(
                req.params.id.toString(),
                updatedObject
            );
            res.status(200).json(updatedBook);
        } catch (e) {
            res.status(500).json({ error: 'Failed to update book' });
        }
    } else {
        res.status(400).json({
            error: 'No fields have been changed from their inital values, so no update has occurred'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        let id_string = req.params.id.toString();
        if(id_string === undefined || id_string === null){
            res.status(400).json({ error: 'No id parameter is given to the getBookById(id) function.' });
            return;
        }
        if(typeof id_string !== 'string'){
            res.status(400).json({ error: 'Input id in getBookById(id) is not of type string.' });
            return;
        }
        if(id_string.length == 0){
            res.status(400).json({ error: 'Input id in getBookById(id) length is 0, empty string.' });
            return;
        }
        // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
        if(id_string.replace(/\s/g, '').length == 0) {
            res.status(400).json({ error: 'Input id in getBookById(id) is only empty spaces.' });return;
        }
        await booksData.getBookById(req.params.id.toString());
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    try {
        const removedBook = await booksData.deleteBook(req.params.id.toString());
        res.status(200).json(removedBook);
    } catch (e) {
        res.status(500).json({ error: 'Failed to remove book' });
    }
});

module.exports = router;