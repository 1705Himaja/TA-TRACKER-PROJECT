const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  role: {
    type: String,
    required: true,
    enum: ["Student", "Instructor", "TA Committee Member", "Department Staff"],
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  znumber: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  joiningDate: {
    type: Date,
  },
});

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
