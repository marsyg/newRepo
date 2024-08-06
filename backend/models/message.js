const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
	text: { type: String, required: true },
	sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	recipient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Message', MessageSchema);