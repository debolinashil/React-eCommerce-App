const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
    // wishlist: {
    //     type: ObjectId,
    //     ref: "Product"
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
