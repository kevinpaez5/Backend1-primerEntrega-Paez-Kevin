import passwordService from "../services/password.service.js";

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await passwordService.requestReset(email);
    res.json({ status: "success", ...result });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const result = await passwordService.resetPassword(token, password);
    res.json({ status: "success", ...result });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
