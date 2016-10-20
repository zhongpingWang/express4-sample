var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://localhost:27017/test', {native_parser:true});
var ObjectId=require('mongoskin').ObjectId;


/* GET users listing. */
router.get('/', function(req, res, next) {

   db.collection('users').find().toArray(function(err, result) {
	  if (err) throw err; 
	   res.send(result);
	});
}); 
 
router.post('/add',function(req,res,next){

	var userName=req.body.userName; 
	 db.collection('users').insert({name:userName,create:new Date()},function(err, result){
	 	if (err) throw err; 
	 	res.send(result);  
	   	db.close();
	 });
});


router.delete('/:id',function(req,res,next){

	var id=req.params.id;

	if (id) {
		 db.collection('users').remove({"_id":ObjectId(id)},function(err, result){
		 	if (err) throw err; 
		 	res.send(result);  
		   	db.close();
		 });
	}else{
		res.send({msg:"not fond"});
	} 
});

router.put('/update',function(req,res,next){

	var id=req.body.id,
		name=req.body.name; 

	if (id) {
 		db.collection('users').update({"_id":ObjectId(id)},{name:name,create:new Date()},function(err, result){
 			if (err) throw err; 
		 	res.send(result);  
		   	db.close();
		});  
	}else{
		res.send({msg:"not fond"});
	} 
});


module.exports = router;
