//Index - show all campground
var express =require("express")
var router = express.Router();
var Campground = require("../models/campground")
var middleware = require("../middleware")

//Index - show all campgrounds
router.get("/",  function(req,res){
        //get campground from database
        Campground.find({},function(err, allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds:allCampgrounds})
            }
        })
})

//Create - add new camp to db
router.post("/",middleware.isLoggedIn, function(req, res){
    var name =req.body.name;
    var price=req.body.price;
    var image =req.body.image;
    var description =req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCamp = {name:name, image:image, description:description, author:author, price:price}
    //create a new campground and save to DB
    Campground.create(newCamp,function(err, newlycamp){
        if(err){
            console.log(err)
        }else{
            //redirect to campgrounds page
             res.redirect("/campgrounds")
        }
    })
})

//New - form to create new camp
router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
})

//Show - more info about one campground
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampgound){
        if(err|| !foundCampgound){
            req.flash("error", "Campground not found")
            res.redirect("back")
        }else{
              res.render("campgrounds/show", {campground:foundCampgound});
        }
    })
})

//Edit Campground Route
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err,foundCampground){
            res.render("campgrounds/edit",{campground:foundCampground})
        })
})

//update campground route
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//Destory Campground Route
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
})




module.exports=router;