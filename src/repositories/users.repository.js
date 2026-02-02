import UsersDAO from "../dao/mongo/user.dao.js";
export default class UsersRepository {
  constructor() {
    this.dao = new UsersDAO();
  }

  getUserByEmail(email) {
    return this.dao.getByEmail(email);
  }

  getUserById(id) {
    return this.dao.getById(id);
  }

  getUsers() {
    return this.dao.getAll();
  }

  createUser(user) {
    return this.dao.create(user);
  }

  updateUser(id, data) {
    return this.dao.update(id, data);
  }

  deleteUser(id) {
    return this.dao.delete(id);
  }

  insertMany(users) {
    return this.dao.insertMany(users);
  }
}
