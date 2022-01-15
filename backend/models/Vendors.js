const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	manager_name: {
		type: String,
		required: true
	},
    shop_name: {
        type: String,
        unique: true,
        dropDups: true,
        required: true
    },
	email: {
		type: String,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
		unique: true,
		dropDups: true,
		required: true
	},
	contact_number: {
		type: Number,
		min: 1000000000,
		max: 9999999999,
		required: true
	},
	

});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
