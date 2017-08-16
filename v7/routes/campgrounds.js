var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var Comment  = require("../models/comment");

//=======================================
//  INDEX route - show all campgrounds
//=======================================
router.get("/", function(req, res){
        //Get all campgrounds from DB and then render
        Campground.find({},function(err,allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index", {campgrounds: allCampgrounds});
            }
        });
});

//=======================================
// CREATE - ADD new campground to DB
//=======================================
router.post("/", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc}
    //Create a new campground and save to DB
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
             //redirect back to campgrounds page
    res.redirect("/campgrounds");
        }
    });
   
});

//=======================================
// NEW -show form to add new Campground
//=======================================
router.get("/new", function(req, res){
    res.render("campgrounds/new.ejs")
});


//=======================================
// SHOW - More info about one campground
//=======================================

router.get("/:id",function(req, res){
    //find the campground with provided ID
    // show the provided id campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
   
});


module.exports = router;