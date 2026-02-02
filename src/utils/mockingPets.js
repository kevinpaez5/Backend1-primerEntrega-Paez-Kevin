import { faker } from "@faker-js/faker";

export const generateMockPets = (qty = 1) => {
  const pets = [];

  for (let i = 0; i < qty; i++) {
    pets.push({
      name: faker.animal.petName(),
      specie: faker.helpers.arrayElement(["dog", "cat", "bird"]),
      age: faker.number.int({ min: 1, max: 15 })
    });
  }

  return pets;
};
