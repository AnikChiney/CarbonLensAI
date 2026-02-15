import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import axios from "axios";

/* ================= TEST ROUTES ================= */

const authPostTest = asyncHandler(async (req, res) => {
  const { test } = req.body;
  res.status(200).json({ message: `ROUTE /authPostTest IS WORKING ${test}` });
});

const authTest = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `ROUTE /authTest IS WORKING` });
});

/* ================= REGISTER USER ================= */

const createUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password, image, phone, city, country } =
    req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({
    fname,
    lname,
    email,
    password,
    image: image || "profile.jpg",
    city: city || "Prayagraj",
    country: country || "India",
  });

  if (phone) user.phone = phone;

  await user.save();

  res.status(201).json({ message: "User created successfully" });
});

/* ================= LOGIN USER ================= */

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      token,
    });
  } else {
    res.status(401).json({ message: "Invalid Email or Password" });
  }
});

/* ================= GOOGLE AUTH ================= */

const googleAuth = asyncHandler(async (req, res) => {
  try {
    const { access_token } = req.body;

    // Get user info from Google
    const googleRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { email, given_name, family_name, picture } = googleRes.data;

    let user = await User.findOne({ email });

    // If user does not exist → create
    if (!user) {
      user = await User.create({
        fname: given_name,
        lname: family_name,
        email,
        password: "google-oauth-user",
        image: picture || "profile.jpg",
        city: "Prayagraj",
        country: "India",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      token,
    });

  } catch (error) {
    console.error("Google Auth Error:", error.message);
    res.status(400).json({ message: "Google authentication failed" });
  }
});

/* ================= LOGOUT ================= */

const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out Successfully" });
};

export {
  createUser,
  loginUser,
  googleAuth,
  logoutUser,
  authTest,
  authPostTest,
};
