import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    carbonFootprint: [
      {
        year: Number,
        month: Number,
        categories: {
          transport: Number,
          electricity: Number,
          others: Number,
        },
      },
    ],
    waterUsage: [
      {
        year: Number,
        month: Number,
        categories: {
          drinking: Number,
          cooking: Number,
          bathing: Number,
          clothWashing: Number,
          utensilsWashing: Number,
          houseWashing: Number,
          waterClosetsFlushing: Number,
          others: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

// 🔹 Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔹 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
