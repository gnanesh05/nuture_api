const mongoose =  require('mongoose');

const AdvisorSchema = new mongoose.Schema({
	name:
	{
	type: String,
    required: true
	},
	
	photo:
	{
	type: String,
	required: true,
	unique: true
	}
});

module.exports =  mongoose.model("Advisor", AdvisorSchema);