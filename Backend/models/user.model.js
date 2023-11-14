const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  scores: [
    {
      Subject_Matter: Number,
      Communication: Number,
      Interview: Number,
    },
  ],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
