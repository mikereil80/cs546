// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

// Follows the code from lecture 5

const express = require('express');
const app = express();
const configRoutes = require('./routes');

configRoutes(app);

app.listen(3000, () => {
    console.log("Server now usable!");
    console.log('Routes will be running on http://localhost:3000');
});