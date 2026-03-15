import AdoptionRepository from "../repositories/adoption.repository.js";

const adoptionRepository = new AdoptionRepository();

class AdoptionService {

  getAdoptions() {
    return adoptionRepository.getAdoptions();
  }

  getAdoptionById(id) {
    return adoptionRepository.getAdoptionById(id);
  }

  createAdoption(data) {
    return adoptionRepository.createAdoption(data);
  }

  deleteAdoption(id) {
    return adoptionRepository.deleteAdoption(id);
  }

}

export default new AdoptionService();