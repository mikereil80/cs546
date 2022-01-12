// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

const express = require('express');
const router = express.Router();
const reviewsData = require('../data/reviews');
const booksData = require('../data/books');

router.get('/:id', async (req, res) => {
    let bookId=req.params.id.toString();
    if(bookId === undefined || bookId === null){
        res.status(400).json({ error: 'No bookId parameter is given to the getAllReviews(bookId) function.' });
        return;
    }
    if(typeof bookId !== 'string'){
        res.status(400).json({ error: 'Input bookId in getAllReviews(bookId) is not of type string.' });
        return;
    }
    if(bookId.length == 0){
        res.status(400).json({ error: 'Input bookId in getAllReviews(bookId) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(bookId.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input bookId in getAllReviews(bookId) is only empty spaces.' });
        return;
    }
    try {
        await booksData.getBookById(bookId);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    try {
        const reviewsList = await reviewsData.getAllReviews(bookId);
        res.json(reviewsList);
    } catch (e) {
        res.status(500).json({ error: 'No reviews found for book' });
    }
});

router.post('/:id', async (req, res) => {
    const reviewingData = req.body;
    const id_string = req.params.id.toString();
    if(reviewingData.title === undefined || reviewingData.title === null){
        res.status(400).json({ error: 'No title is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.' });
        return;
    }
    if(reviewingData.reviewer === undefined || reviewingData.reviewer === null){
        res.status(400).json({ error: 'No reviewer is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.' });
        return;
    }
    if(reviewingData.rating === undefined || reviewingData.rating === null){
        res.status(400).json({ error: 'No rating is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.' });
        return;
    }
    if(reviewingData.dateOfReview === undefined || reviewingData.dateOfReview === null){
        res.status(400).json({ error: 'No dateOfReview is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.' });
        return;
    }
    if(reviewingData.review === undefined || reviewingData.review === null){
        res.status(400).json({ error: 'No review is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.' });
        return;
    }
    if(id_string === undefined || id_string === null){
        res.status(400).json({ error: 'No bookId is given to createReview(title, reviewer, rating, dateOfReview, review, bookId) function.' });
        return;
    }
    if(typeof reviewingData.title !== 'string'){
        res.status(400).json({ error: 'Input title in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not of type string.' });
        return;
    }
    if(reviewingData.title.length == 0){
        res.status(400).json({ error: 'Input title in createReview(title, reviewer, rating, dateOfReview, review, bookId) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(reviewingData.title.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input title in createReview(title, reviewer, rating, dateOfReview, review, bookId) is only empty spaces.' });
        return;
    }
    if(typeof reviewingData.reviewer !== 'string'){
        res.status(400).json({ error: 'Input reviewer in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not of type string.' });
        return;
    }
    if(reviewingData.reviewer.length == 0){
        res.status(400).json({ error: 'Input reviewer in createReview(title, reviewer, rating, dateOfReview, review, bookId) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(reviewingData.reviewer.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input reviewer in createReview(title, reviewer, rating, dateOfReview, review, bookId) is only empty spaces.' });
        return;
    }
    if(typeof reviewingData.rating !== 'number'){
        res.status(400).json({ error: `Input rating in createReview(title, reviewer, rating, dateOfReview, review, bookId) value is not a number.` });
        return;
    }
    if(isNaN(reviewingData.rating)){
        res.status(400).json({ error: `Input rating in createReview(title, reviewer, rating, dateOfReview, review, bookId) value is NaN.` });
        return;
    }
    if(typeof reviewingData.dateOfReview !== 'string'){
        res.status(400).json({ error: 'Input dateOfReview in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not of passed in as type string.' });
        return;
    }
    if(reviewingData.dateOfReview.length == 0){
        res.status(400).json({ error: 'Input dateOfReview in createReview(title, reviewer, rating, dateOfReview, review, bookId) length is 0, empty string passed in.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(reviewingData.dateOfReview.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input dateOfReview in createReview(title, reviewer, rating, dateOfReview, review, bookId) is only empty spaces passed in.' });
        return;
    }
    if(!Date.parse(reviewingData.dateOfReview)){
        res.status(400).json({ error: `Input dateOfReview in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not a valid date.` });
        return;
    }
    // Found the date regex on https://stackoverflow.com/questions/15196451/regular-expression-to-validate-datetime-format-mm-dd-yyyy
    let date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if(!reviewingData.dateOfReview.match(date_regex)){
        res.status(400).json({ error: `Input dateOfReview in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not in the proper mm/dd/yyyy format.` });
        return;
    }
    if(typeof reviewingData.review !== 'string'){
        res.status(400).json({ error: 'Input review in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not of type string.' });
        return;
    }
    if(reviewingData.review.length == 0){
        res.status(400).json({ error: 'Input review in createReview(title, reviewer, rating, dateOfReview, review, bookId) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(reviewingData.review.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input review in createReview(title, reviewer, rating, dateOfReview, review, bookId) is only empty spaces.' });
        return;
    }
    if(typeof id_string !== 'string'){
        res.status(400).json({ error: 'Input id in createReview(title, reviewer, rating, dateOfReview, review, bookId) is not of type string.' });
        return;
    }
    if(id_string.length == 0){
        res.status(400).json({ error: 'Input id in createReview(title, reviewer, rating, dateOfReview, review, bookId) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id_string.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input id in createReview(title, reviewer, rating, dateOfReview, review, bookId) is only empty spaces.' });
        return;
    }
    try {
        await booksData.getBookById(id_string);
    } catch (e) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    try {
        const { title, reviewer, rating, dateOfReview, review } = reviewingData;
        const newReview = await reviewsData.createReview(title, reviewer, rating, dateOfReview, review, id_string);
        res.json(newReview);
    } catch (e) {
        res.status(500).json({ error: 'Could not create Review' });
    }
});

router.get('/review/:id', async (req, res) => {
    let id_string=req.params.id.toString();
    if(id_string === undefined || id_string === null){
        res.status(400).json({ error: 'No id parameter is given to the getReviewById(id) function.' });
        return;
    }
    if(typeof id_string !== 'string'){
        res.status(400).json({ error: 'Input id in getReviewById(id) is not of type string.' });
        return;
    }
    if(id_string == 0){
        res.status(400).json({ error: 'Input id in getReviewById(id) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id_string.replace(/\s/g, '').length == 0) {
        res.status(400).json({ error: 'Input id in getReviewById(id) is only empty spaces.' });
        return;
    }
    try {
        const review = await reviewsData.getReviewById(id_string);
        res.json(review);
    } catch (e) {
        res.status(404).json({ error: 'Review not found' });
    }
});

router.delete('/review/:id', async (req, res) => {
    const id_string = req.params.id.toString();
    if(id_string === undefined || id_string === null){
        res.json(400).json({ error: 'No id parameter is given to the deleteReview(id) function.' });
        return;
    }
    if(typeof id_string !== 'string'){
        res.json(400).json({ error: 'Input id in deleteReview(id) is not of type string.' });
        return;
    }
    if(id_string.length == 0){
        res.json(400).json({ error: 'Input id in deleteReview(id) length is 0, empty string.' });
        return;
    }
    // found on https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces
    if(id_string.replace(/\s/g, '').length == 0) {
        res.json(400).json({ error: 'Input id in deleteReview(id) is only empty spaces.' });
        return;
    }
    try {
        await reviewsData.getReviewById(id_string);
    } catch (e) {
        res.status(404).json({ error: 'Review not found' });
        return;
    }
    try {
        const deletion = await reviewsData.deleteReview(id_string);
        res.status(200).json(deletion);
    } catch (e) {
        res.status(500).json({ error: 'Could not delete review' });
    }
});
  
module.exports = router;