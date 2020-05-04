//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require('lodash');



const homeStartingContent = "Welcome to My Blog Project. Where you can enter your Daily Journey one day at a time. Document and save it forever.Click to on Compose to write a new Article. It would be Automatically redirected to the home page";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// DATABASE
mongoose.connect('mongodb+srv://admin-ahsan:test123@cluster0-ponjz.mongodb.net/blogDB', {useNewUrlParser : true, useUnifiedTopology : true});

const postSchema = {
  title : String,
  content : String
};

const Post = mongoose.model('Post', postSchema);
// DATABASE
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/',function (req, res) {
  const posts = Post.find({},function (err, posts) {
    res.render('home', {
      startContent : homeStartingContent,
      posts : posts
    });
  })
})


app.get('/posts/:postId', function (req, res) {
  const postId = req.params.postId;
  Post.findOne({_id:postId},function (err, post) {
    res.render('post',{
      postTitle : post.title,
      postContent : post.content
    });
  })
})

app.get('/about', function (req, res) {
  res.render('about',{
    content : aboutContent
  })
});

app.get('/contact', function (req, res) {
  res.render('contact',{
    content : contactContent
  })
});


app.get('/compose',function (req,res) {
  res.render('compose')
})



app.post('/compose',function (req,res) {

    const post = new Post({
      title : req.body.title,
      content : req.body.post
    })

    post.save(function (err) {
      if (!err) {
          res.redirect('/');
      }
    });
})



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
