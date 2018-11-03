var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comments = require("./models/comment");

var data = [
             {
                name: "Campground 1",
                image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144594f0c17fa0e5b5_340.jpg",
                description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum finibus diam, vitae vulputate eros pulvinar sit amet. Vestibulum consectetur maximus velit, at dignissim mi pellentesque a. Proin lorem est, porttitor quis risus nec, feugiat hendrerit risus. Sed sollicitudin eleifend augue, et interdum nisl imperdiet vel. Sed efficitur mauris vitae lobortis hendrerit. Morbi sed nisi vel lectus aliquet aliquam id non urna. In hendrerit dolor blandit pretium tincidunt. Mauris aliquam lorem ligula, vitae egestas magna tristique sodales. Curabitur eget ornare diam. Duis nec augue posuere, sagittis risus eget, scelerisque nulla. Mauris egestas dapibus justo eu facilisis. Praesent quam dolor, eleifend in finibus quis, tempor vel massa. Praesent vitae metus elementum, commodo magna volutpat, tincidunt eros. Nullam velit ipsum, consequat dictum erat ut, elementum consequat erat. Suspendisse et pharetra velit, faucibus tincidunt nulla."  
             },
             {
                name: "Campground 2",
                image: "https://pixabay.com/get/e830b90b2ef71c22d2524518b7444795ea76e5d004b0144594f0c17fa0e5b5_340.png",
                description:"Sed porta est id nisl fringilla pretium. Maecenas dictum posuere nulla sed vestibulum. Vestibulum at dolor tristique, gravida mauris vitae, euismod arcu. Quisque nec dui a diam mollis suscipit nec eget eros. Nunc varius elit a enim ultricies, id gravida urna vestibulum. In aliquet lacus in sapien rhoncus, sit amet consectetur mi lobortis. Vivamus nec vulputate enim. Fusce ac tortor quis tellus tincidunt mollis. Aenean aliquet bibendum massa vel varius. Donec nec augue ut nibh finibus aliquet eget eu diam."  
             },
             {
                name: "Campground 3",
                image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f1c179a1eabdb8_340.jpg",
                description:"In sed dictum diam. Sed quis rutrum neque. Morbi sed arcu massa. Duis eget fringilla dolor, quis luctus massa. Sed malesuada venenatis consectetur. Mauris viverra ex vel maximus sollicitudin. Sed eleifend velit non augue ultricies, ullamcorper sollicitudin dolor lobortis. Nulla mattis quam a libero blandit, dapibus maximus leo aliquet. Donec pulvinar tellus a mauris viverra, a egestas nulla varius."  
             }
            ]

function seedDB(){
    //remove all the campground
    Campground.deleteMany({}, function(err, campgrounds){
       if(err){
            console.log(err);
        }else{
            console.log("All campgrounds are removed!!");
            //add campground  
              data.forEach(function(seed){
                  Campground.create(seed, function(err, camp){
                      if(err){
                          console.log(err)
                      }else{
                          console.log("added a campground");
                          Comments.create({
                              text: "This place is great",
                              author:"Homer"
                          }, function(err, comment){
                              if(err){
                                  console.log(err)
                              }else{
                                  camp.comments.push(comment);
                                  camp.save();
                                  console.log("Created comment")
                              }
                              
                          })
                      }
                  })
              })
            }
    });
}

module.exports = seedDB;