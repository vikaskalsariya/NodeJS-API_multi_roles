const express = require('express');

const app = express();

const port = 8050;

const db = require("./config/db.js");

    const passport = require('passport');

    const session = require('express-session');

app.use(express.urlencoded());

const passportjwt = require("./config/passport-jwt-strategy.js");

app.use(session({
    name : 'AdminData',
    secret: 'adminregister',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge : 1000*60*100,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/admin',require('./routes/API/v1/Admin/admin.js'));
app.use('/manager',require('./routes/API/v1/Manager/manager.js'));
app.use('/user',require('./routes/API/v1/User/user.js'));

app.listen(port,(err)=>{
    if(err)
    {
        console.log(err)
        return false;
    }
    console.log("run successfully with port : "+port);
});