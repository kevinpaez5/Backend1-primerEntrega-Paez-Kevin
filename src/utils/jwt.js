import jwt from "jsonwebtoken";

export const generateToken = (user, expiresIn = "24h") => {
  const payload = {
    id: user._id,
    role: user.role,
    email: user.email
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
