const generateToken = require("./generatetoken");
const User = require("../models/user");

const registerUser = async (req, res) => {
	const { firstName, lastName, email, password, username } = req.body;
	const emailExists = User.findOne({ email });
	if (emailExists) {
		return res.status(400).json({ message: "email already exists" });
	}
	const userExists = User.findOne({ username });
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
      token : generateToken(user._id)
    })
  }
};
const authUser = async (req, res) => {
  const { username, password } = req.body;
  const user = User.findOne({ username }),
  if (user && (await user.matchPassword({ password }))) {
    
  }
  
}
