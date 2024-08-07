import User from "../Models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.statusCode(400);
    throw new Error("Invalid email or password.");
  }

  const isPassword = bcrypt.compareSync(password, user.password);

  if (!isPassword) {
    res.status(400);
    throw new Error("Invalid email or password...");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token,
  });
});

// register

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Unable to create account with this email");
  }

  const user = new User({
    name,
    email,
    password: hashPassword,
  });

  const createdUser = await user.save();

  const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: token,
  });
});







// edit profile 


export const editProfile = asyncHandler(async (req, res) => {
  
  const { name, email, currentPassword,confirmPassword, newPassword } = req.body;
  

  let user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }

  const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);

  if (!isPasswordValid) {
    res.status(400).json({ message: "Incorrect password" });
    return;
  }
  if(!(newPassword==confirmPassword))
  {
    res.status(400).json({ message: "Password doesn't match" });
    return;

  }
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  user.name = name;
  user.email = email;
  user.password = hashedPassword;

  const updatedUser = await user.save();

  const token = jwt.sign({ _id: updatedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: token,
  })


});