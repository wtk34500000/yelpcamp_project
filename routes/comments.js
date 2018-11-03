var express = require("express")
var router =express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        }else{
             res.render("comments/new", {campground:campground})
        }
    })
})

//Comment Create
router.post("/", middleware.isLoggedIn, function(req, res){
    // look up ground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campground");
        }else{
            //creating comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Somethign went wrong")
                    console.log(err);
                }else{
                    comment.author.id= req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    //adding comment
                    campground.comments.push(comment);
                    campground.save();
                    //redirect afterward 
                    req.flash("success", "Successfully added comment")
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
})


//Comment Edit 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error", "Campground not found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back")
        }else{
            res.render("comments/edit", {campground_id:req.params.id, comment:foundComment})
        }
     });
    });
});

//Comment Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if(err){
            res.redirect("back")
        }else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})

//comment destry route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

module.exports = router;