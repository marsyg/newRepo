const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
	text: { type: String, required: true },
	sender: { type: String, required: true },
	recipient: {
		type: String,

		required: true,
	},
	timestamp: { type: Date, default: Date.now },
});
const MessageModel = mongoose.model("MessageModel", MessageSchema);
module.exports = {
	MessageModel,
	MessageSchema,
};
