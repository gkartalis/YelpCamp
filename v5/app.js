var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User     = require("./models/user"),
    seedDB      = require("./seeds");
    
var promise = mongoose.connect('mongodb://localhost/yelp_camp_v4', {
  useMongoClient: true,
  /* other options */
});



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

    seedDB();


//=======================================
//          Routes!
//=======================================

app.get("/", function(req, res){
   res.render("landing");
});

//=======================================
//  INDEX route - show all campgrounds
//=======================================
app.get("/campgrounds", function(req, res){
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
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new.ejs")
});


//=======================================
// SHOW - More info about one campground
//=======================================

app.get("/campgrounds/:id",function(req, res){
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

//=======================================
//              Comments Routes
//=======================================

app.get("/campgrounds/:id/comments/new", function(req, res){
   Campground.findById(req.params.id, function(err, campground){
      if(err) {
          console.log(err);
      }else{
          res.render("comments/new", {campground: campground});
      }
   });
});

app.post("/campgrounds/:id/comments", function(req, res){
    // lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/"+ campground._id);
               }
            });
            }
    });
    
    // create new comment
    // connect new comment to campground
    // redirect campground show page
    
});

//=======================================
//              LISTEN
//=======================================
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!"); 
});