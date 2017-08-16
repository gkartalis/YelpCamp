var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    


var promise = mongoose.connect('mongodb://localhost/yelp_camp', {
  useMongoClient: true,
  /* other options */
});



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//=======================================
// SCHEMA SETUP
//=======================================
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});


// compiling the schema into a model!
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
    
//     name: "Mukonos",
//     image: "https://media-cdn.tripadvisor.com/media/photo-s/02/75/6d/50/filename-img-0950-jpg.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite"
// },function(err, campground){
//   if(err) {
//       console.log(err);
//   }else{
//       console.log("Newly Created Campground");
//       console.log(campground);
//   }
// });


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
                res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new.ejs")
});


//=======================================
// SHOW - More info about one campground
//=======================================

app.get("/campgrounds/:id",function(req, res){
    //find the campground with provided ID
    // show the provided id campground
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground: foundCampground});
        }
    });
   
});

//=======================================
//              LISTEN
//=======================================
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!"); 
});