import { Router } from "express";
import { generateMockUsers } from "../utils/mockingUsers.js";
import { generateMockPets } from "../utils/mockingPets.js";
import UsersRepository from "../repositories/users.repository.js";
import PetsRepository from "../repositories/pets.repository.js";

const router = Router();

const usersRepository = new UsersRepository();
const petsRepository = new PetsRepository();

/**
 * GET /api/mocks/mockingusers
 * Genera 50 usuarios mock (NO los guarda)
 */
router.get("/mockingusers", (req, res) => {
  const users = generateMockUsers(50);
  res.json({ status: "success", payload: users });
});

/**
 * GET /api/mocks/mockingpets
 * (endpoint migrado)
 */
router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(50);
  res.json({ status: "success", payload: pets });
});

/**
 * POST /api/mocks/generateData
 * Inserta users y pets en DB
 */
router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    if (users > 0) await usersRepository.insertMany(mockUsers);
    if (pets > 0) await petsRepository.insertMany(mockPets);

    res.json({
      status: "success",
      message: "Datos generados correctamente",
      insertedUsers: users,
      insertedPets: pets
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
