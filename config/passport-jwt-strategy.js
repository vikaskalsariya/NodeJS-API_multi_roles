const passport = require('passport');
let passportjwt = require('passport-jwt');
let AdminRegister = require('../models/Admin/Register.js');
let ManagerRegister = require('../models/Manager/Register.js');
let UserRegister = require('../models/User/Register.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//------------------- Admin side ------------
let adminRegister = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :'adminregister'
};

//------------------- Manager side ------------
let managerRegister = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :'managerregister'
};

//------------------- User side ------------
let userRegister = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :'userregister'
};

//------------------- Admin side ------------
passport.use(new JwtStrategy(adminRegister, async (record, done)=>{
    let checkAdmin = await AdminRegister.findById(record.admin._id);
    if(checkAdmin)
    {
        return done(null,checkAdmin)
    }
    else{
        return done(null,false);
    }
}))

//------------------- Manager side ------------
passport.use('manager',new JwtStrategy(managerRegister, async (record, done)=>{
    let checkManager = await ManagerRegister.findById(record.manager._id);
    if(checkManager)
    {
        return done(null,checkManager)
    }
    else{
        return done(null,false);
    }
}))

//------------------- User side ------------
passport.use('user',new JwtStrategy(userRegister, async (record, done)=>{
    let checkUser = await UserRegister.findById(record.user._id);
    if(checkUser)
    {
        return done(null,checkUser)
    }
    else{
        return done(null,false);
    }
}))

passport.serializeUser(async (user,done)=>{
    return done(null,user.id)
})

passport.deserializeUser( async (id,done)=>{
    let recheck = await AdminRegister.findById(id);
    if(recheck){
        return done(null,recheck);
    }
    else{
        return done(null,false);
    }
})

module.exports = passport;