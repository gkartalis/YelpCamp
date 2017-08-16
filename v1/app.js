var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds =[
        {name: "Salmon Creek", image: "http://downloads.naftemporiki.gr.edgesuite.net/static/13/07/05/pap.jpg?ORGANVMENO%20CAMPING%20STHN%20ELLADA:%20OIKONOMIKES%20DIAKOPES%20KATV%20AP%E2%80%99%20TA%20ASTERIA"},
        {name: "Mukonos", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/75/6d/50/filename-img-0950-jpg.jpg"},
        {name: "Mountain Goats Rest", image: "https://www.lightgear.gr/wp/wp-content/uploads/2014/02/xeimerino-camping-lightgear.jpg"},
        {name: "Agia Anna", image: "http://www.californiasbestcamping.com/photos5/salmon_creek_camp.jpg"},
        {name: "Salmon Creek", image: "http://downloads.naftemporiki.gr.edgesuite.net/static/13/07/05/pap.jpg?ORGANVMENO%20CAMPING%20STHN%20ELLADA:%20OIKONOMIKES%20DIAKOPES%20KATV%20AP%E2%80%99%20TA%20ASTERIA"},
        {name: "Mukonos", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/75/6d/50/filename-img-0950-jpg.jpg"},
        {name: "Mountain Goats Rest", image: "https://www.lightgear.gr/wp/wp-content/uploads/2014/02/xeimerino-camping-lightgear.jpg"},
        {name: "Agia Anna", image: "http://www.californiasbestcamping.com/photos5/salmon_creek_camp.jpg"},
        {name: "Salmon Creek", image: "http://downloads.naftemporiki.gr.edgesuite.net/static/13/07/05/pap.jpg?ORGANVMENO%20CAMPING%20STHN%20ELLADA:%20OIKONOMIKES%20DIAKOPES%20KATV%20AP%E2%80%99%20TA%20ASTERIA"},
        {name: "Mukonos", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/75/6d/50/filename-img-0950-jpg.jpg"},
        {name: "Mountain Goats Rest", image: "https://www.lightgear.gr/wp/wp-content/uploads/2014/02/xeimerino-camping-lightgear.jpg"},
        {name: "Agia Anna", image: "http://www.californiasbestcamping.com/photos5/salmon_creek_camp.jpg"}
    ]
//=======================================
//          Routes!
//=======================================

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
        res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")
});

//=======================================
//              LISTEN
//=======================================
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!"); 
});