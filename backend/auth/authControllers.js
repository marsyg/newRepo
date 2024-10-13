const generateToken = require("./generatetoken");
const User = require("../models/user");
require("dotenv").config();

const registerUser = async (req, res) => {
	console.log("check inside auth", req.body);
	const { firstName, lastName, email, password, username } = req.body;
	const emailExists = await User.findOne({ email });

	console.log("check here", emailExists);

	if (emailExists) {
		return res.status(400).json({ message: "email already exists" });
	}
	const userExists = await User.findOne({ username });
	if (userExists) {
		return res.status(400).json({ message: "User already exists " });
	}

	const user = await User.create({
		username,
		firstName,
		lastName,
		email,
		password,
	});
	if (user) {
		res.json({
			username: user.username,
			id: user._id,
			email: user.email,
			token: generateToken(user._id),
		});
	}
};

const authUser = async (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);
	const user = await User.findOne({ username });
	if (user && (await user.matchPassword({ password }))) {
		res.json({
			_id: user._id,
			username: user.username,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401).json({
			message: "Invalid username or password",
		});
	}
};																																																																										
const protectedRoute = async (req, res, next) => {
	const bearerHeader = req.headers.authorization;
	const bearer = bearerHeader.split(" ");
	const token = bearer[1];

	if (token) {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = await User.findById(decoded.id).select("-password");
		next();
	} else {
		res.status(401).json({ message: "Unauthorized" });
	}
};
module.exports = { authUser, protectedRoute, registerUser };
