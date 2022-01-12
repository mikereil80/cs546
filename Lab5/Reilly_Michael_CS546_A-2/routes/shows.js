// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

// How to use express and router come from the lecture 5 code.

const express = require('express');
const router = express.Router();
const data = require('../data');
const showsData = data.shows;


// Follows the code from lecture 5

// For /shows route
router.get('/', async (req, res) => {
    try {
        const showsList = await showsData.getShows();
        res.json(showsList);
    }catch(e){
        res.status(500).send();
    }
});

// For /shows/:id route
router.get('/:id', async (req, res) => {
    try{
        const id_num = Number(req.params.id);
        // Basic error checks.
        if(typeof id_num !== 'number'){
            res.status(400).json({ message: `The id parameter is not a number.` });
            return;
        }
        if(isNaN(id_num)){
            res.status(400).json({ message: `The id parameter is NaN.` });
            return;
        }
        if(id_num < 0){
            res.status(400).json({ message: `The id paramter is negative.`});
            return;
        }
        if((id_num - Math.floor(id_num)) !== 0){
            res.status(400).json({ message: `The id parameter is not a whole number.`});
            return;
        }
        if(!isNaN(id_num)){
            const show = await showsData.getShowsById(id_num);
            res.json(show);
            return;
        }
    }catch(e){
        res.status(404).json({ message: 'Show of given id not found in shows database.' });
        return;
    }
});

module.exports = router;