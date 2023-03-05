var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Expressjwt=require("express-jwt");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');
const { ObjectId } = require('mongodb');
//This code sets up a Node.js server using Express and several middleware modules including CORS, cookie-parser, and logger. It also connects to a MongoDB database using Mongoose.
require("dotenv").config();
var app = express();
app.use(
  "/api/private",
  Expressjwt.expressjwt({
  secret:process.env.SECRET,
  algorithms:["HS256"],
})
)
app.use(
  "/api/comment",
  Expressjwt.expressjwt({
  secret:process.env.SECRET,
  algorithms:["HS256"],
})
)
app.use(
  "/api/editpost",
  Expressjwt.expressjwt({
  secret:process.env.SECRET,
  algorithms:["HS256"],
})
)
app.use(
  "/api/editcomment",
  Expressjwt.expressjwt({
  secret:process.env.SECRET,
  algorithms:["HS256"],
})
)
app.use(
  "/api/deletec",
  Expressjwt.expressjwt({
  secret:process.env.SECRET,
  algorithms:["HS256"],
})
)
app.use(
  "/api/deletep",
  Expressjwt.expressjwt({
  secret:process.env.SECRET,
  algorithms:["HS256"],
})
)
app.use(
  "/api/deletepc",
  Expressjwt.expressjwt({
  secret:process.env.SECRET,
  algorithms:["HS256"],
})
)
//make above routes can use jwt
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)


var hash = bcrypt.hashSync("B4c0/\/", salt);


function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}//password Encryption
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const mongoose = require('mongoose');
const { time } = require('console');
mongoose.connect('mongodb://127.0.0.1:27017/testdb');
//connect mongoose
const users = mongoose.model('users', {email:String,password:String});
const posts = mongoose.model('posts', {email:String,post:String,title:String,time:String,language:String});
const comments = mongoose.model('comments', {email:String,comment:String,id:mongoose.Schema.Types.ObjectId,time:String});
//build categories in mongodb
app.post("/api/user/register/", (req, res) => {
  //register router
  var rusername=req.body.email;
  var ruserpassword=req.body.password;
  var j=0;
  users.findOne({email:rusername},function(err,food){
    if(!food||err){
      //if there are no same email in mongodb,then register
      var password = bcrypt.hashSync(ruserpassword, salt);
      var id=guid();
      new  users({

        email: rusername, 
        password: password
      }).save(function(err){
          if (err) return handleError(err);
      });
      res.send({
        "success": true,
        "m":"success"
      });
    }
    else{
      //there exists same username
      return res.status(403).json("Email already in use");
    }
    
  })
})


  app.post("/api/search", (req, res) => {
    var l = [];
    var word = req.body.word;
  //get the word needed to find
    posts
      .find({
        $or: [
          { post: { $regex: word, $options: "i" } },
          { title: { $regex: word, $options: "i" } },
        ],
      })//if word in the title or post of a post then send it to a list
      .then((posts) => {
        posts.forEach((post) => {
          l.push(post);
        });
        console.log(l);
        res.send({ results: l });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("An error occurred while searching for posts");
      });
  });
  
  
app.post("/api/user/login", (req, res) => {
  var name=req.body.email;
  var pass=req.body.password;
  
  users.findOne({email:name},function(err,food){
    //find in exist email
    if(!food||err){
      
      res.status(401).send({
        "success": false,
         "m":"success",
        "msg": "Invalid credentials",
      });
    }else{
      
      item=food;
      console.log(item)
      let password1=item.password
      let correctpass= bcrypt.compareSync(pass,password1)//ensure the correctness of password
      if(correctpass){
        const jwtPayload = {
          email: name,
          id:item.id
        }//store message in jwt
        jwt.sign(
          jwtPayload,
          process.env.SECRET,
          {
            expiresIn: "100m"//Duration of accreditation
          },
          (err, token) => {
            return res.json({success: true, token});
          });

      }else{
          return res.status(401).send({
            "success": false,
            "msg": "Invalid credentials",
          });//success
      }   
    }
    
  })
})

app.post("/api/private", (req, res) => {
  if(!req.auth.email){
    res.send("unauthorized");
  }//Validation
  var now = new Date();
  console.log(now.toString())
  var aa=req.auth.email;
  var post=req.body;//get infomation
  new posts({
    email:aa,
    post:post.word,
    title:post.title,
    time:now.toString(),
    language:post.language
  }).save(function(err){
    if (err) return handleError(err);
  })//save in mongodb
  res.send({"post":"post success"});
  

});//store post
app.post("/api/comment", (req, res) => {
  if(!req.auth.email){
    res.send("unauthorized");
  }//Validation

  var aa=req.auth.email;//get infomation
  var ww=req.body;

  var now = new Date();
  console.log(
    ww.language
  );
  new comments({
    email:aa,
    comment:ww.word,
    id:ww.postId,
    time:now.toString(),
    
  }).save(function(err){
    if (err) return handleError(err);
  })
  res.send({"comment":"comment success"});
  

});//store comments
app.post("/api/posts", (req, res) => {
  var l = [];

  posts.find({}, function(err, records) {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving posts");
      return;
    }

    records.forEach(record => {
      l.push(record);
    });

    res.json({ list: l });
  });
});//collect all posts
app.post("/api/commentlist", (req, res) => {
  var l = [];
  var postid=req.body
  console.log(postid)
  comments.find({}, function(err, records) {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving posts");
      return;
    }

    records.forEach(record => {
      if(record.id==postid.postId){
        l.push(record);
      }
      
    });

    res.json({ list: l });
  });
});//collect all comments for related post
app.post("/api/editpost", (req, res) => {
  if (!req.auth.email) {
    res.send("unauthorized");
    return;
  }
  const email = req.auth.email;
  const aa = req.body;
  const postId = aa.postId;
  const newPost = aa.word;
  const newTitle = aa.title;
  const now = new Date();
  const time = now.toString();
  
  posts.findOne({ _id: postId }, (err, foundPost) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    
    if (!foundPost) {
      res.status(404).send('Post not found');
      return;
    }
    
    if (foundPost.email == email || email =="admin") {
      foundPost.title = newTitle;
      foundPost.post = newPost;
      foundPost.time = time;
      //if you are the admin account or the owner of the post,you can edit it
      foundPost.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }

      res.status(200).send({"status": "success edit"})
    });
      return;
    }
    res.status(403).json({"status":'You are not authorized to update this post'});
    
  });
  
});

app.post("/api/editcomment", (req, res) => {
  if (!req.auth.email) {
    res.send("unauthorized");
    return;
  }
  const email = req.auth.email;
  const aa = req.body;
  const commentId = aa.commentId;
  console.log(commentId

  );
  const newComment = aa.word;
  const now = new Date();
  const time = now.toString();
  
  comments.findOne({ _id: commentId }, (err, foundPost) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    
    if (!foundPost) {
      res.status(404).send('Post not found');
      return;
    }
    
    if (foundPost.email == email || email=="admin") {
          foundPost.comment = newComment;
    foundPost.time = time;
    //if you are the admin account or the owner of the post,you can edit it
    foundPost.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }

      res.status(200).send({"status": "success edit"})
    });
      return;
    }res.status(403).json({"status":'You are not authorized to update this comment'});


    
  });
})

app.post("/api/deletec", (req, res, next) => {
  if(req.auth.email=="admin"){
    const com = req.body.id;

    comments.findOneAndDelete({_id:com}, function (err, co) {
      if (err) throw err;
      console.log({co});
      return res.send({"msg": "success delete"})//deleted related comment
  });
  }

});



app.post("/api/deletepc", (req, res, next) => {
  const pi = req.body.id;
  console.log(req.auth.email)
  if(req.auth.email=="admin"){
      comments.deleteMany({id:pi}, function (err, co) {
      if (err) throw err;
      console.log({co});
    });
//deleted post-related comments
  }
  if(req.auth.email=="admin"){
    posts.findOneAndDelete({_id:pi}, function (err, co) {
    if (err) throw err;
    console.log({co});
    return res.send({"msg": "success delete"})
  });
  }//deleted related post
 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
