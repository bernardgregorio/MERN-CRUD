import mongoose from "mongoose";
import Status from "./status.js";
const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        // If googleId is not present, password is required
        return this.googleId || value;
      },
      message: "Password is required if Google ID is not provided",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  googleId: {
    type: String,
    default: null,
    validate: {
      validator: function (value) {
        // If password is present, googleId should not be provided
        return !this.password || !value;
      },
      message: "Google ID should not be provided if password is present",
    },
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Status,
    default: "67beaaffebab9c1b684fd3d4",
  },
  expirationDate: {
    type: Date,
    default: function () {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Adds 1 month to the current date
    },
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  createBy: {
    type: String,
    default: null,
  },
});

export default mongoose.model("User", userSchema);
