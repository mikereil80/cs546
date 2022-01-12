const express = require('express');
const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');
const configRoutes = require('./routes');

// Michael Reilly
// I pledge my honor that I have abided by the Stevens Honor System.

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(
    session({
        name: 'AuthCookie',
        secret: "This secret is a secret that's so secretive",
        saveUninitialized: true,
        resave: false
    })
);

let log = function(req, res, next){
    let reqDateTime = new Date().toUTCString();
    let method = req.method;
    let url = req.originalUrl;
    let authenticator = (!!req.session.user) ? "(Authenticated User)" : "(Non-Authenticated User)";
    console.log(`[${reqDateTime}]: ${method} ${url} ${authenticator}`);
    next();
}

app.use(log);

app.use('/private', (req, res, next) => {
    if(!req.session.user){
        return res.status(403).render('loginerror', {error: "The User is Not Logged in."});
    }
    else{
        next();
    }
});

app.use('/login', (req, res, next) => {
    if(req.session.user){
        return res.redirect('/private');
    }
    else{
        next();
    }
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got our server!");
    console.log("Routes will be running on http://localhost:3000");
});