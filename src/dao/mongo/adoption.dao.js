import { AdoptionModel } from "../../models/adoption.model.js";

export default class AdoptionDAO {

  getAll = () => AdoptionModel.find().populate("user pet");

  getById = (id) => AdoptionModel.findById(id).populate("user pet");

  create = (adoption) => AdoptionModel.create(adoption);

  delete = (id) => AdoptionModel.findByIdAndDelete(id);

}