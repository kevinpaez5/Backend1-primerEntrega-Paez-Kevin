import { UserModel } from "../../models/user.model.js";

export default class UsersDAO {
  getByEmail = (email) => UserModel.findOne({ email });
  getById = (id) => UserModel.findById(id);
  getAll = () => UserModel.find();
  create = (user) => UserModel.create(user);
  update = (id, data) => UserModel.findByIdAndUpdate(id, data, { new: true });
  delete = (id) => UserModel.findByIdAndDelete(id);
  insertMany = (users) => UserModel.insertMany(users);
}
