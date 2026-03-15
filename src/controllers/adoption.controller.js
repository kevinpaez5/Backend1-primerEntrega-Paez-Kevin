import adoptionService from "../services/adoption.service.js";

export const getAdoptions = async (req, res) => {

  const adoptions = await adoptionService.getAdoptions();

  res.json({
    status: "success",
    payload: adoptions
  });

};

export const getAdoptionById = async (req, res) => {

  const { id } = req.params;

  const adoption = await adoptionService.getAdoptionById(id);

  res.json({
    status: "success",
    payload: adoption
  });

};

export const createAdoption = async (req, res) => {

  const adoption = await adoptionService.createAdoption(req.body);

  res.status(201).json({
    status: "success",
    payload: adoption
  });

};

export const deleteAdoption = async (req, res) => {

  const { id } = req.params;

  await adoptionService.deleteAdoption(id);

  res.json({
    status: "success",
    message: "Adoption deleted"
  });

};