// Michael Reilly, 10439198, CS-546A
// I pledge my honor that I have abided by the Stevens Honor System.

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const aboutme = {
        "name": "Michael Reilly",
        "cwid": "10439198",
        "biography": "I'm Michael Reilly and I'm a 3/(?) Computer Science major here at Stevens. I enjoy playing videogames, watching TV and listening to music.\nI'm the treasurer of TranSIT here at Stevens, which is atransgender support group/club here at Stevens. I used to be a fencer in high school, specifically I fenced foil. Fun Fact: I'm a triplet, the only boy with two sisters.",
        "favoriteShows": ["Survivor", "Big Brother", "The Amazing Race", "The Challenge", "Rupaul's Drag Race"]
    };
    res.json(aboutme);
});

module.exports = router;