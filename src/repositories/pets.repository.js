import PetsDAO from "../dao/mongo/pet.dao.js";

export default class PetsRepository {
  constructor() {
    this.dao = new PetsDAO();
  }

  getAll() {
    return this.dao.getAll();
  }

  getById(id) {
    return this.dao.getById(id);
  }

  create(pet) {
    return this.dao.create(pet);
  }

  update(id, data) {
    return this.dao.update(id, data);
  }

  delete(id) {
    return this.dao.delete(id);
  }

  insertMany(pets) {
    return this.dao.insertMany(pets);
  }
}
