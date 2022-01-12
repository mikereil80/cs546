const express = require('express');
const router = express.Router();
const path = require("path");
const bcrypt = require('bcryptjs');
const users = require('../users');

// Michael Reilly
// I pledge my honor that I have abided by the Stevens Honor System.

router.get('/', async (req, res) => {
    if(req.session.user){
        res.redirect('/private');
    }
    else{
        res.render('login', {title: "Log In"});
    }
})

router.post('/login', async (req, res) => {
    if(req.session.user){
        return res.redirect('/private');
    }
    else{
        if(!req.body.username || !req.body.password){
            res.status(401).render('loginerror', {title: "Login Error", error: "Username and/or Password is invalid."});
        }
        else{
            for(let i=0; i<users.length; i++){
                const user=users[i];
                const samePassword = await bcrypt.compare(req.body.password, user.hashedPassword);
                if(user.username === req.body.username && samePassword){
                    req.session.user = user;
                    res.redirect('/private');
                    break;
                }
            }
            if(!req.session.user){
                res.status(401).render('loginerror', {title: "Login Error", error: "Username and/or Password is invalid."});
            }
        }
    }
});

router.get('/private', async (req, res) => {
    if(req.session.user){
        res.render('private', {title: "Private", user: req.session.user});
    }
    else{
        res.redirect('/');
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('logout', {title: "Log Out"});
});

module.exports = router;