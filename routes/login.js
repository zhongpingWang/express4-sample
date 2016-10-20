var express = require('express');
var router = express.Router();

var db = require('mongoskin').db('mongodb://localhost:27017/test', {native_parser:true});
//db.bind('users');

//var mongo = require('mongoskin');
//var db = mongo.db("mongodb://localhost:27017/test", {native_parser:true});
//db.bind('users');
// db.users.find().toArray(function(err, items) {
// 		console.log(items);
//         db.close();
// });




/* GET users listing. */
router.get('/', function(req, res, next) {
	
	db.collection('users').find().toArray(function(err, result) {
	  if (err) throw err;
	  console.log(result);
	   res.send(result);
	});

	//console.log(req.session);
	//req.session.uid=123;
  //res.send('login');
});

module.exports = router;