const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true },
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
