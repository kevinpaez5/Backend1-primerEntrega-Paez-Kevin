import UsersRepository from "../repositories/users.repository.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { transporter } from "../utils/mailer.js";

const usersRepository = new UsersRepository();

class PasswordService {

  async requestReset(email) {
    const user = await usersRepository.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    const token = generateToken({ id: user._id }, "1h");

    const link = `http://localhost:8080/reset-password?token=${token}`;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Recuperar contraseña",
      html: `<a href="${link}">Restablecer contraseña</a>`
    });

    return { message: "Email enviado" };
  }

  async resetPassword(token, newPassword) {
    const payload = verifyToken(token);
    const user = await usersRepository.getUserById(payload.id);

    if (isValidPassword(user, newPassword)) {
      throw new Error("La contraseña no puede ser la misma");
    }

    user.password = createHash(newPassword);
    await user.save();

    return { message: "Contraseña actualizada" };
  }
}

export default new PasswordService();
