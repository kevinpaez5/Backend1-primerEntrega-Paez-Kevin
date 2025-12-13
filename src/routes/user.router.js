import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import { createHash } from "../utils/hash.js";

const router = Router();

// CREATE
router.post("/", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  const user = await UserModel.create({
    first_name,
    last_name,
    email,
    age,
    password: createHash(password)
  });

  res.json({ status: "success", user });
});

// READ
router.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

export default router;
