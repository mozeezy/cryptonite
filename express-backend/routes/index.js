var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET watchlist page. */
router.get('/watchlist', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET news page. */
router.get('/news', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
