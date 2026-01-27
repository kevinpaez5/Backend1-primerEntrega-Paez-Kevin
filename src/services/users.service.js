import UsersRepository from "../repositories/users.repository.js";
import { createHash } from "../utils/hash.js";

class UsersService {
  constructor() {
    this.repository = new UsersRepository();
  }

  async createUser(userData) {
    userData.password = createHash(userData.password);
    return this.repository.createUser(userData);
  }

  getUsers() {
    return this.repository.getUsers();
  }

  async getUserByEmail(email) {
    return this.repository.getUserByEmail(email);
  }

  getUserById(id) {
    return this.repository.getUserById(id);
  }

  updateUser(id, data) {
    return this.repository.updateUser(id, data);
  }

  deleteUser(id) {
    return this.repository.deleteUser(id);
  }
}

export default new UsersService();
