const express = require('express');
var router = express.Router();

// Michael Reilly
// I pledge my honor that I have abided by the Stevens Honor System.

router.get('/', async (req, res) => {
    res.render('layouts/main', {});
})

module.exports = router;