import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import axios from "axios";

/* ================= REGISTER USER ================= */
const createUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password, image, phone, city, country } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({
    fname,
    lname,
    email,
    password, // hashed automatically by pre("save")
    image: image || "profile.jpg",
    phone: phone || "",
    city: city || "Prayagraj",
    country: country || "India",
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.status(201).json({
    _id: user._id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    phone: user.phone,
    city: user.city,
    country: user.country,
    image: user.image,
    token,
  });
});

/* ================= LOGIN USER ================= */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid Email or Password" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid Email or Password" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.status(200).json({
    _id: user._id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    phone: user.phone,
    city: user.city,
    country: user.country,
    image: user.image,
    token,
  });
});

/* ================= GOOGLE AUTH ================= */
const googleAuth = asyncHandler(async (req, res) => {
  try {
    const { access_token } = req.body;

    const googleRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { email, given_name, family_name, picture } = googleRes.data;

    let user = await User.findOne({ email });
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(200).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      city: user.city,
      country: user.country,
      image: user.image,
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

export { createUser, loginUser, googleAuth, logoutUser };
