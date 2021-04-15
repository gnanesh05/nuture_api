const express = require("express");
const router = express.Router();
const Advisor = require("../models/advisor")




router.get("/", async (req,res)=>{
	try{
	const advisors = await  Advisor.find();
		res.json(advisors);
	}
	catch(err){
		res.status(500).json({message: err.message})
}
	
});

router.post("/advisor", async (req,res)=>{
	console.log(req.body.name);
	const advisor =  new Advisor({
		name: req.body.name,
		photo: req.body.photo
		
	});
	
	try{
	    await advisor.save()
		res.status(200).send("created");
	}
	catch(err)
		{
		  res.status(400).json({message: err.message})
		}
})
module.exports = router;