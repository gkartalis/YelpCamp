var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
        {
            name: "Cloud's Rest", 
            image: "https://i0.wp.com/frapress.gr/wp-content/uploads/2016/07/camping-near-the-lake-background-wallpaper.jpg?resize=350%2C200&ssl=1",
            description: "blah blah blah"
        },
        {
            name: "Folmer's Cave", 
            image: "http://www.doinglifetogether365.com/wp-content/uploads/2015/08/canot_camp_000.jpg",
            description: "blah blah blah"
        },
        {
            name: "Salmon's Creek", 
            image: "http://static1.squarespace.com/static/52e41b83e4b0eeee5467db96/571a3c3c859fd064f6487f96/590c98661b10e36084e436ef/1493997740673/tent_camping.jpg?format=1000w",
            description: "blah blah blah"
        },
    ]
function seedDB(){
    // Remove all Campgrounds
    Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds");
        // Add A few Campgrounds
        data.forEach(function(seed){
           Campground.create(seed, function(err, campground){
               if(err){
                   console.log(err);
               }else{
                   console.log("added a campground");
                   Comment.create({
                       text: "This place is great but No internet!!!",
                       author: "Homer"}, function(err, comment){
                          if(err){
                              console.log(err);
                          }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created a new comment");
                          }
                       });
               }
           }) 
        });
    });
    
}

module.exports = seedDB;