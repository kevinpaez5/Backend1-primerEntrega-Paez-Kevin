import PetsRepository from "../repositories/pets.repository.js";

export default class PetsService {
  constructor() {
    this.repository = new PetsRepository();
  }

  getPets() {
    return this.repository.getAll();
  }

  createPet(pet) {
    return this.repository.create(pet);
  }

  insertMany(pets) {
    return this.repository.insertMany(pets);
  }
}
