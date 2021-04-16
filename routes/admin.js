const express = require("express");
const router = express.Router();
const Advisor = require("../models/advisor")






router.post("/advisor", async (req,res)=>{
	console.log(req.body.name);
	const advisor =  new Advisor({
		name: req.body.name,
		photo: req.body.photo
		
	});
	
	try{
	    await advisor.save()
		res.status(200).send("200_OK");
	}
	catch(err)
		{
		  return res.status(400).send("400_BAD_REQUEST");
			console.log(err.message);
		}
})
module.exports = router;