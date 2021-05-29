import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  age: String,
});

mongoose.models = {};

export const User = mongoose.model("User", userSchema);
