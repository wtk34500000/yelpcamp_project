var express = require("express"),
    app=express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport= require("passport"),
    localStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    Campground = require("./models/campground"),
    flash = require("connect-flash"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment"),
    User = require("./models/user");

//requiring routes
var commentRouter = require("./routes/comments"),
    campgroundRouter = require("./routes/campgrounds"),
    indexRouter = require("./routes/index")

mongoose.connect(process.env.DATABASEURL, {useNewUrlParser:true});
//mongoose.connect("mongodb://yelpcamp:h123456789@ds151383.mlab.com:51383/yelpcamp2018",{useNewUrlParser:true});



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"))
app.use(methodOverride("_method"))
app.use(flash());
//seedDB(); 

//passport config
app.use(require("express-session")({
    secret:"Once again Rusty wins cutest dog!",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    next();
})

app.use("/",indexRouter);
app.use("/campgrounds",campgroundRouter);
app.use("/campgrounds/:id/comments", commentRouter);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!")
})