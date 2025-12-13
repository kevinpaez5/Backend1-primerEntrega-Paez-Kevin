import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/jwt.js";

const router = Router();

// LOGIN
router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.json({ status: "success", token });
  }
);

// CURRENT
router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {

    //ocultamos la contraseña
    const { password, ...userWithoutPassword } = req.user._doc;
    res.json({
      status: "success",
      user: userWithoutPassword
    });
  }
);

export default router;
