import { PetModel } from "../../models/pet.model.js";

export default class PetsDAO {
  getAll = () => PetModel.find();
  getById = (id) => PetModel.findById(id);
  create = (pet) => PetModel.create(pet);
  update = (id, data) => PetModel.findByIdAndUpdate(id, data, { new: true });
  delete = (id) => PetModel.findByIdAndDelete(id);
  insertMany = (pets) => PetModel.insertMany(pets);
}
