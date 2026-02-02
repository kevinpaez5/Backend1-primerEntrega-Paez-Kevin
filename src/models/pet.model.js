import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  specie: String,
  age: Number
});

export const PetModel = mongoose.model("pets", petSchema);
