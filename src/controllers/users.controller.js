import UsersService from "../services/users.service.js";


export const getUsers = async (req, res) => {
  const users = await UsersService.getUsers();
  res.json({ status: "success", users });
};

import UserDTO from '../dto/user.dto.js';

export const createUser = async (req, res) => {
  try {
    const user = await UsersService.createUser(req.body);
    const userDTO = new UserDTO(user);

    res.status(201).json({
      status: 'success',
      user: userDTO
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
