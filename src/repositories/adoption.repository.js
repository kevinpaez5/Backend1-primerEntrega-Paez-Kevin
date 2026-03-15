import AdoptionDAO from "../dao/mongo/adoption.dao.js";

export default class AdoptionRepository {

  constructor() {
    this.dao = new AdoptionDAO();
  }

  getAdoptions() {
    return this.dao.getAll();
  }

  getAdoptionById(id) {
    return this.dao.getById(id);
  }

  createAdoption(data) {
    return this.dao.create(data);
  }

  deleteAdoption(id) {
    return this.dao.delete(id);
  }

}