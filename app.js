//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require('lodash');



const homeStartingContent = "Welcome to My Blog Project. Where you can enter your Daily Journey one day at a time. Document and save it forever.Click Compose to write a new Article. It would be Automatically redirected to the home page";
const aboutContent = "Hello I am Md Ahsan Raza. Aspiring Web Developer and a Software Engineer. I am a Quick Learner, Passionate about technologies and using them into implementing and launching new projects. Looking to start a career as a entry-level software engineer with a reputed firm driven by technology";
const contactContent = "This a sample contact page.";

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
