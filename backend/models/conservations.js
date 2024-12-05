const mongoose = require("mongoose");
const {MessageSchema} = require("./message");

const ConversationSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: false },
  messages :[MessageSchema],
})
const Conversations = mongoose.model("Conversations", ConversationSchema);
module.exports = Conversations;