import { faker } from "@faker-js/faker";
import { createHash } from "./hash.js";

export const generateMockUsers = (qty = 1) => {
  const users = [];

  for (let i = 0; i < qty; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: createHash("coder123"), // 🔐 encriptada
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: []
    });
  }

  return users;
};
