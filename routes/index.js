var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.loggedIn){
    res.redirect('login');
  }
  next();
},(req,res)=>{
  res.render('index')
});

router.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect('/');
    }
  })
})

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
    var username = req.body.username;
  var password = req.body.password;
  if (username === 'admin@gmail.com' && password === 'password') {
    req.session.loggedIn = true;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Incorrect username or password' });
  }
  });

module.exports = router;
