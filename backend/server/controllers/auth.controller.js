import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import upload from "../../utils/multer.js";
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import gravatar from "gravatar";
import path from "path";

// @ ROUTE    POST api/user/register
// @ ACCESS   Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, password2 } = req.body;
  const emailAvatarUrl = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });

  const avatar = req.file ? req.file.path : emailAvatarUrl;

  if (!name || !email || !avatar || !password || !password2) {
    res.status(400);
    throw new Error(
      "Please enter Name, Email, Image, Password and Confirm password"
    );
  }
  if (password !== password2) {
    res.status(400);
    throw new Error("Password do not match");
  }
  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exist!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar,
  });

  if (!user) {
    res.status(500);
    throw new Error("Error while signing up...");
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
    expiresIn: "1d",
  });

  const { password: pass, ...rest } = user._doc;

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "Account created successfully!",
      data: rest,
    });
});

// @ ROUTE    POST  api/user/login
// @ ACCESS   Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("Wrong credentials");
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    res.status(400);
    throw new Error("Wrong credentials");
  }

  const { password: pass, ...rest } = user._doc;
  const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
    expiresIn: "1d",
  });
  res
    .status(200)
    .cookie("token", token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000 })
    .json({
      success: true,
      message: "Logged in successfully",
      data: rest,
    });
});

// @route     GET api/user/logout
// @access    Private
export const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(0), httpOnly: true })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

// @route     PUT api/user/update
// @access    Private
export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(404);
    throw new Error("No user found!");
  }
  const avatar = req.file?.filename;
  const { name, newPassword } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name: name ? name : user.name,
        password: newPassword
          ? bcrypt.hashSync(newPassword, 10)
          : user.password,
        avatar: avatar !== undefined ? avatar : user.avatar,
      },
    },
    { new: true }
  );
  const { password: pass, ...rest } = updatedUser._doc;

  res.status(201).json({
    success: true,
    message: "User updated successfully",
    data: rest,
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const {password: pass, ...rest} = user._doc;
  res.status(200).json({
    success: true,
    message: "Get user information",
    data: rest,
  });
});
