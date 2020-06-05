const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "You must provide name",
      minlength: 1,
    },
    email: {
      type: String,
      required: "You must provide email",
      unique: true,
      validate: {
        validator: (value) =>
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            value
          ),
        message: "You must provide a valid email",
      },
    },
    accountType: {
      type: String,
      required: "You must provide accountType",
      validate: {
        validator: (value) => /^(admin|user)$/.test(value),
        message:
          "Invalid accountType: Must be one of admin and user",
      },
    },
    phone: {
      type: Number,
      required: "You must provide Phone Number",
      validate: {
        validator: (value) => /^[0-9]+$/.test(value),
        message:
          "Invalid accountType: Must be one of admin and user",
      },
    },
    createdAt: {
      type: Date,
    },
    password: {
      type: String,
      required: "You must provide password",
      set(value) {
        return bcrypt.hashSync(value);
      },
    },
  },
  { timestamps: true }
);
schema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password);
};
schema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

module.exports = mongoose.model("User", schema);
