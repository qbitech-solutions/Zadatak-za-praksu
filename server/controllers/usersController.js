const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

async function signup(req, res) {
  try {
    //Get username and password from request body
    const { username, password } = req.body;

    //Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //Create new user
    await User.create({ username, password: hashedPassword });

    //Respond
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

async function login(req, res) {
  try {
    //Get username and password from request body
    const { username, password } = req.body;

    //Find the user
    const user = await User.findOne({ username });

    if (!user) {
      res.sendStatus(401);
    }

    //Compare hashed passwords
    const passCheck = bcrypt.compareSync(password, user.password);
    if (!passCheck) {
      return res.sendStatus(401);
    }

    //Create a JWT token
    const token = jwt.sign({ sub: user._id }, process.env.SECRET_KEY);
    res.setHeader("Authorization", `Bearer ${token}`);

    //Respond
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

const logout = (req, res) => {
  //res.set("Authorization", "");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  signup: signup,
  login: login,
  logout: logout,
};
