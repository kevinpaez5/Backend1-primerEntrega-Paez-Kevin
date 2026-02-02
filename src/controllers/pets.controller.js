import PetsService from "../services/pets.service.js";

const petsService = new PetsService();

export const getPets = async (req, res) => {
  try {
    const pets = await petsService.getPets();
    res.json({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
