const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const Admin = require('../models/Admin');
passport.use(new passportLocal({
    usernameField : 'email'
},async (email,password,done)=>{
    let adminData = await Admin.findOne({email : email});
    if(adminData){
        if(password==adminData.password){
            return done(null,adminData);
        }
        else{
            return done(null,false);
        }
    }
    else{
        return done(null,false);
    }
}));
passport.serializeUser( async (adminData,done)=>{
    return done(null,adminData.id);
});
passport.deserializeUser(async(id,done)=>{
    let adminRecord = await Admin.findById(id);
    if(adminRecord){
        return done (null,adminRecord);
    }
    else{
        return done(null,false);
    }
});
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}
passport.checkAthuntication = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/admin/');
    }
}
module.exports = passport