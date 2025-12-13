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
  const users = await UserModel.find().select("-password");
  res.json({ status: "success", users });
});

// READ POR ID
router.get("/:uid", async (req, res) => {
  const user = await UserModel.findById(req.params.uid).select("-password");

  if (!user)
    return res.status(404).json({ error: "Usuario no encontrado" });

  res.json({ status: "success", user });
});

// UPDATE
router.put("/:uid", async (req, res) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.params.uid,
    req.body,
    { new: true }
  ).select("-password");

  if (!updatedUser)
    return res.status(404).json({ error: "Usuario no encontrado" });

  res.json({ status: "success", user: updatedUser });
});

// DELETE
router.delete("/:uid", async (req, res) => {
  const deletedUser = await UserModel.findByIdAndDelete(req.params.uid);

  if (!deletedUser)
    return res.status(404).json({ error: "Usuario no encontrado" });

  res.json({ status: "success", message: "Usuario eliminado" });
});

export default router;
