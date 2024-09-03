const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs"); //from npmjs.com
const jwt = require("jsonwebtoken"); //jsonwebtoken from npmjs.com

async function registerController(req, res) {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    //hash password   using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword; //replaced userEntered Normal PAssword with hashed password

    // saving rest data
    const user = new userModel(req.body); // creatinfg new user in userModel by selecting all data from body
    await user.save(); // Saving user data
    return res.status(201).send({
      success: true,
      message: "User Registeed Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
}

//login Data Controller
const loginController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    console.log("Existing User Role:", existingUser.role);
    console.log("Request Body Role:", req.body.role);

    //check role                  //if anything apart from donar,hospital.... enum containees
    if (existingUser.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "Role does not match",
      });
    }

    //compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      //here we are encrypting token based on userId so that if we need furthur then we can access directly by userID
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } //USer has to login again after 1 day
    );
    return res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId }); //userId we've added in token
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
