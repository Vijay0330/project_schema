const mongoose = require("mongoose");

//Already exist
const options = { discriminatorKey: "userType" };

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    resetCode: { type: String, default: false },
  },
  options
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
