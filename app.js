//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

const uri = "mongodb+srv://nandini:8nHLyrdi9A-sqgb@cluster0.7w5wj.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let comments = [];

const commentsSchema = {
  user: String,
  comment: String
 };

 const Comment = mongoose.model("Comment", commentsSchema);

app.get("/home", function(req, res){
  Comment.find({}, function(err, comments){
    res.render("home", {
      startingContent: homeStartingContent,
      comments: comments
      }); 
  })
});

app.post("/home", function(req, res){
  // const comment = {
  //   user: req.body.user,
  //   comment: req.body.comment
  // }

  // comments.push(comment);

  const newComment = new Comment ({
    user: req.body.user,
    comment: req.body.comment
  });
  
  newComment.save(function(err){
    if (!err){
      res.redirect("/home");
    }
  });

});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent:contactContent});
});

app.get("/about", function(req, res){
  res.render("about", {about:aboutContent});
});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
