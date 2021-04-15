const mongoose =  require('mongoose');

const BookingSchema = new mongoose.Schema({
	advisor_name:
	{
	type: String,
    required: true
	},
	
	advisor_photo:
	{
	type: String,
	required: true
	},
	booking_time:
	{
	type: Date,
	required: true
    },
	user:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		}
	}
});

module.exports =  mongoose.model("Booking", BookingSchema);