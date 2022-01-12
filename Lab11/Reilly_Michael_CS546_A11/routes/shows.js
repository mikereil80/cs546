const express = require('express');
const router = express.Router();
const xss = require('xss');

// Michael Reilly
// I pledge my honor that I have abided by the Stevens Honor System.

router.get("/", async (req, res) => {
    res.render('layouts/main', {});
});

module.exports = router;