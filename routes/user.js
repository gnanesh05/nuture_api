const express = require("express");
const router = express.Router();
const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Advisor = require("../models/advisor");
const Booking = require("../models/booking");
const user_check = require("../middleware/check_user");



router.get("/",  (req,res)=>{
	try{
	const users =   User.find();
		res.json(users);
	}
	catch(err){
		res.status(500).json({message: err.message})
}
	
	
});

router.post("/register",  (req,res)=>{
	
	bcrypt.hash(req.body.password,10,(err,hash)=>{
		if(err)
			{
				return res.status(500).send(err.message);
			}
		else{
		const user =  new User({
		name: req.body.name,
		email: req.body.email,
		password: hash
		});
		user
		   .save()
		   .then(result=>{
			   const token = jwt.sign({
						email: user.email,
						userId: user._id
					},"secretKey",
							{
						expiresIn: "1h"
					});
				res.status(200).json({
					"id":user._id,
					"token": token
				})
		})
			.catch(err=>{
			res.status(500).send("400_BAD_REQUEST ");
		})
		
			
	}
		
		
	});
	
})

router.post("/login", (req, res)=>{
	User.find({email: req.body.email})
	    .exec()
	    .then(user=>{
		if(user.length <1)
			{
				return res.status(400).send("400_BAD_REQUEST ");
			}
		bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
			if(err)
			{return res.status(401).send("400_BAD_REQUEST ")
			}
			if(result)
				{
					const token = jwt.sign({
						email: user[0].email,
						userId: user[0]._id
					},"secretKey",
							{
						expiresIn: "1h"
					});
					
					return res.status(200).json({
			
						"token": token,
						"id": user[0]._id
					});
				}
			return res.status(401).send("400_BAD_REQUEST ")
		})
		
	})
	    .catch(err=>{
			res.status(500).json({
				"message": err.message
			})
		});
})


router.get("/:id/advisor", (req,res)=>{
  try{
	  const advisors =  Advisor.find();
	  res.status(200).json({
		  "advisors": advisors
	  })
  }
	catch(err){
		console.log(err);
		
	}
	
});
//607461bcf7ba8c0a98f666aa
//6074615fda7c600a2f8e0dc2

router.post("/:userid/advisor/:advisorid", (req,res)=>{
	
		const userId = req.params.userid;
		const advisorId = req.params.advisorid;
	
		User.findById(userId, (err, user)=>{
			if(err)
				console.log(err);
			else{
				Advisor.findById(advisorId, (err,advisor)=>{
					if(err)
						console.log(err)
					else
						{
					const booking  = new Booking({
						advisor_name : advisor.name,
						advisor_photo: advisor.photo,
						booking_time: req.body.time,
						user:{
							id: userId
						}
					})
					booking.save();
					return res.status(200).send("booked");
						}
				})
			}
		});
	
	
})

router.get("/:id/advisor/booking",  (req,res)=>{
	try{
	  const user = User.findById(req.params.id, (err, found)=>{
		  if(found)
		  {const vuser = {
		   id: found._id
	     }
		  console.log(vuser);
		  const bookings =  Booking.find({user: vuser}, (err, books)=>{
			  
			  res.status(200).json({books})
			 
		  });
		  }
	  
	  })
	  
	  
  }
	catch(err){
		console.log(err);
		
	}
	
})
module.exports = router;